#!/usr/bin/python

# This tool generates the classic SoD runes data

import sys
import requests
import math
import re

from typing import List

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

if len(sys.argv) < 2:
	raise Exception("Missing arguments, expected output_file_path")

output_file_path = sys.argv[1]

# Added these options so that chrome would run in a docker container
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
wait = WebDriverWait(driver, 10)
element_locator = (By.ID, "data-tree-switcher")

def _get_spell_id_from_link(link):
	return int(link.split("/")[-2].split("=")[-1])


def get_engraving_ids() -> List[int]:
	driver.get(f"https://www.wowhead.com/classic/search?q=engrave#abilities")
	wait.until(EC.presence_of_element_located(element_locator))

	abilities = driver.find_elements(By.ID, "tab-abilities")

	if len(abilities) == 0:
		print(f"Engravings missing ability tab.")
		return []

	abilities = abilities[0]
	pages = int(abilities.find_element(By.CLASS_NAME, "listview-nav").find_element(By.CSS_SELECTOR, 'b:last-child').text)/50
	pages = math.ceil(pages)
	all_ids = []

	for page in range(pages):
		print(f'Loading page {page} for runes...')
		driver.get(f"https://www.wowhead.com/classic/search?q=engrave#abilities:{page*50}")
		driver.refresh()
		wait.until(EC.presence_of_element_located(element_locator))
		abilities_tab = driver.find_element(By.ID, "tab-abilities")
		rows = abilities_tab.find_elements(By.CLASS_NAME, "listview-row")
		all_ids.extend([_get_spell_id_from_link(row.find_element(By.CLASS_NAME, "listview-cleartext").get_attribute("href"))
			for row in rows])

	driver.quit()
	return all_ids

def get_tooltips_response(id):
	# Get the underlying rune spell ID from the engraving ID
	url = f"https://nether.wowhead.com/classic/tooltip/spell/{id}"
	result = requests.get(url)

	if result.status_code == 200:
		response_json = result.text
		return response_json
	else:
		print(f"Request for id {id} failed with status code: {result.status_code}")
		return None
	

# id, tooltip_json
to_export = []

engraving_ids = get_engraving_ids()

print(f"Export Count ({len(engraving_ids)}) {engraving_ids}")

to_export = []

for id in engraving_ids:
    engraving_response = get_tooltips_response(id)
    spell_ids = re.findall(r'\/spell=(\d+)', engraving_response)

    if len(spell_ids) >= 2:
        second_spell_id = spell_ids[1]

        # Extract the icon from the second spell response
        second_spell_response = get_tooltips_response(second_spell_id)
        icon_match = re.search(r'icon":"(.*?)"', second_spell_response)
        icon = icon_match.group(1) if icon_match else None

        # Replace the icon in the engraving response
        updated_engraving_response = re.sub(r'icon":"(.*?)"', f'icon":"{icon}"', engraving_response)

        to_export.append([second_spell_id, updated_engraving_response])
    else:
        print(f"Less than 2 spell IDs found for engraving ID {id}")

output_string = '\n'.join([str(','.join([str(inner_elem) for inner_elem in elem])) for elem in to_export])

with open(output_file_path, "w") as outfile:
    outfile.write(output_string)
