import { ref } from 'tsx-vanilla';

import { IndividualSimUI } from '../../../individual_sim_ui';
import { EquippedItem } from '../../../proto_utils/equipped_item';
import { getEligibleItemSlots } from '../../../proto_utils/utils';
import { TypedEvent } from '../../../typed_event';
import { Component } from '../../component';
import { ItemRenderer } from '../../gear_picker';
import { GearData } from '../../gear_picker/item_list';
import { SelectorModalTabs } from '../../gear_picker/selector_modal';
import { BulkTab } from '../bulk_tab';

export default class BulkItemPicker extends Component {
	private readonly itemElem: ItemRenderer;
	readonly simUI: IndividualSimUI<any>;
	readonly bulkUI: BulkTab;
	readonly index: number;

	protected item: EquippedItem;

	constructor(parent: HTMLElement, simUI: IndividualSimUI<any>, bulkUI: BulkTab, item: EquippedItem, index: number) {
		super(parent, 'bulk-item-picker');
		this.simUI = simUI;
		this.bulkUI = bulkUI;
		this.index = index;
		this.item = item;
		this.itemElem = new ItemRenderer(parent, this.rootElem, simUI.player);

		const removeBtn = ref<HTMLButtonElement>();
		this.itemElem.rootElem.appendChild(
			<button className="remove-batch-item-btn" ref={removeBtn}>
				<i className="fas fa-times" />
			</button>,
		);
		removeBtn.value!.addEventListener('click', () => this.bulkUI.removeItemByIndex(this.index));

		this.simUI.sim.waitForInit().then(() => {
			this.setItem(item);
			const slot = getEligibleItemSlots(this.item.item)[0];
			const eligibleEnchants = this.simUI.sim.db.getEnchants(slot);
			const eligibleRandomSuffixes = this.item.item.randomSuffixOptions;

			const openEnchantSelector = (event: Event) => {
				event.preventDefault();

				if (!!eligibleEnchants.length) {
					this.bulkUI.selectorModal.openTab(slot, SelectorModalTabs.Enchants, this.createGearData());
				} else if (!!eligibleRandomSuffixes.length) {
					this.bulkUI.selectorModal.openTab(slot, SelectorModalTabs.RandomSuffixes, this.createGearData());
				}
			};

			this.itemElem.iconElem.addEventListener('click', openEnchantSelector);
			this.itemElem.nameElem.addEventListener('click', openEnchantSelector);
			this.itemElem.enchantElem.addEventListener('click', openEnchantSelector);
		});
	}

	setItem(newItem: EquippedItem | null) {
		this.itemElem.clear();
		if (!!newItem) {
			this.itemElem.update(newItem);
			this.item = newItem;
		} else {
			this.itemElem.rootElem.style.opacity = '30%';
			this.itemElem.iconElem.style.backgroundImage = `url('/cata/assets/item_slots/empty.jpg')`;
			this.itemElem.nameElem.textContent = 'Add new item (not implemented)';
			this.itemElem.rootElem.style.alignItems = 'center';
		}
	}

	private createGearData(): GearData {
		const changeEvent = new TypedEvent<void>();
		return {
			equipItem: (_, equippedItem: EquippedItem | null) => {
				if (equippedItem) {
					const allItems = this.bulkUI.getItems();
					allItems[this.index] = equippedItem.asSpec();
					this.item = equippedItem;
					this.bulkUI.setItems(allItems);
					changeEvent.emit(TypedEvent.nextEventID());
				}
			},
			getEquippedItem: () => this.item,
			changeEvent: changeEvent,
		};
	}
}
