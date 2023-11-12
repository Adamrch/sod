import {
	Consumes,
	CustomRotation,
	CustomSpell,
	Explosive,
	Flask,
	Food,
	Glyphs,
	UnitReference,
	Spec
} from '../core/proto/common.js';
import { SavedTalents } from '../core/proto/ui.js';

import {
	Deathknight_Options as DeathKnightOptions,
	Deathknight_Rotation as DeathKnightRotation,
	Deathknight_Rotation_ArmyOfTheDead,
	Deathknight_Rotation_BloodRuneFiller,
	Deathknight_Rotation_CustomSpellOption as CustomSpellOption,
	Deathknight_Rotation_FrostRotationType,
	Deathknight_Rotation_Presence,
	DeathknightMajorGlyph,
	DeathknightMinorGlyph,
	Deathknight_Rotation_DrwDiseases,
	Deathknight_Rotation_BloodSpell,
} from '../core/proto/deathknight.js';

import * as PresetUtils from '../core/preset_utils.js';

import P1BloodGear from './gear_sets/p1_blood.gear.json';
import P2BloodGear from './gear_sets/p2_blood.gear.json';
import P3BloodGear from './gear_sets/p3_blood.gear.json';
import P4BloodGear from './gear_sets/p4_blood.gear.json';
import PreraidUh2hGear from './gear_sets/preraid_uh_2h.gear.json';
import P1Uh2hGear from './gear_sets/p1_uh_2h.gear.json';
import P4Uh2hGear from './gear_sets/p4_uh_2h.gear.json';
import PreraidUhDwGear from './gear_sets/preraid_uh_dw.gear.json';
import P1UhDwGear from './gear_sets/p1_uh_dw.gear.json';
import P2UhDwGear from './gear_sets/p2_uh_dw.gear.json';
import P3UhDwGear from './gear_sets/p3_uh_dw.gear.json';
import P4UhDwGear from './gear_sets/p4_uh_dw.gear.json';
import PreraidFrostGear from './gear_sets/preraid_frost.gear.json';
import P1FrostGear from './gear_sets/p1_frost.gear.json';
import P2FrostGear from './gear_sets/p2_frost.gear.json';
import P3FrostGear from './gear_sets/p3_frost.gear.json';
import P4FrostGear from './gear_sets/p4_frost.gear.json';
import P1FrostSubUhGear from './gear_sets/p1_frost_subUh.gear.json';

import BloodPestiApl from './apls/blood_pesti.apl.json';
import BloodPestiDDApl from './apls/blood_pesti_dd.apl.json';
import BloodPestiAoeApl from './apls/blood_pesti_aoe.apl.json';
import FrostBlPestiApl from './apls/frost_bl_pesti.apl.json';
import FrostUhPestiApl from './apls/frost_uh_pesti.apl.json';
import UhDwSsApl from './apls/unholy_dw_ss.apl.json';
import Uh2hSsApl from './apls/uh_2h_ss.apl.json';
import UhDndAoeApl from './apls/uh_dnd_aoe.apl.json';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

export const P1_BLOOD_PRESET = PresetUtils.makePresetGear('P1 Blood', P1BloodGear, { talentTree: 0 });
export const P2_BLOOD_PRESET = PresetUtils.makePresetGear('P2 Blood', P2BloodGear, { talentTree: 0 });
export const P3_BLOOD_PRESET = PresetUtils.makePresetGear('P3 Blood', P3BloodGear, { talentTree: 0 });
export const P4_BLOOD_PRESET = PresetUtils.makePresetGear('P4 Blood', P4BloodGear, { talentTree: 0 });
export const PRERAID_FROST_PRESET = PresetUtils.makePresetGear('Pre-Raid Frost', PreraidFrostGear, { talentTree: 1 });
export const P1_FROST_PRESET = PresetUtils.makePresetGear('P1 Frost', P1FrostGear, { talentTree: 1 });
export const P2_FROST_PRESET = PresetUtils.makePresetGear('P2 Frost', P2FrostGear, { talentTree: 1 });
export const P3_FROST_PRESET = PresetUtils.makePresetGear('P3 Frost', P3FrostGear, { talentTree: 1 });
export const P4_FROST_PRESET = PresetUtils.makePresetGear('P4 Frost', P4FrostGear, { talentTree: 1 });
export const P1_FROSTSUBUNH_PRESET = PresetUtils.makePresetGear('P1 Frost Sub Unh', P1FrostSubUhGear, { talentTree: 1 });
export const PRERAID_UNHOLY_2H_PRESET = PresetUtils.makePresetGear('Pre-Raid 2H Unholy', PreraidUh2hGear, { talentTree: 2 });
export const P1_UNHOLY_2H_PRESET = PresetUtils.makePresetGear('P1 2H Unholy', P1Uh2hGear, { talentTree: 2 });
export const P4_UNHOLY_2H_PRESET = PresetUtils.makePresetGear('P4 2H Unholy', P4Uh2hGear, { talentTree: 2 });
export const PRERAID_UNHOLY_DW_PRESET = PresetUtils.makePresetGear('Pre-Raid DW Unholy', PreraidUhDwGear, { talentTree: 2 });
export const P1_UNHOLY_DW_PRESET = PresetUtils.makePresetGear('P1 DW Unholy', P1UhDwGear, { talentTree: 2 });
export const P2_UNHOLY_DW_PRESET = PresetUtils.makePresetGear('P2 DW Unholy', P2UhDwGear, { talentTree: 2 });
export const P3_UNHOLY_DW_PRESET = PresetUtils.makePresetGear('P3 DW Unholy', P3UhDwGear, { talentTree: 2 });
export const P4_UNHOLY_DW_PRESET = PresetUtils.makePresetGear('P4 DW Unholy', P4UhDwGear, { talentTree: 2 });

export const DefaultUnholyRotation = DeathKnightRotation.create({
	useDeathAndDecay: true,
	btGhoulFrenzy: true,
	refreshHornOfWinter: false,
	useGargoyle: true,
	useEmpowerRuneWeapon: true,
	holdErwArmy: false,
	preNerfedGargoyle: false,
	armyOfTheDead: Deathknight_Rotation_ArmyOfTheDead.AsMajorCd,
	startingPresence: Deathknight_Rotation_Presence.Unholy,
	blPresence: Deathknight_Rotation_Presence.Blood,
	presence: Deathknight_Rotation_Presence.Blood,
	gargoylePresence: Deathknight_Rotation_Presence.Unholy,
	bloodRuneFiller: Deathknight_Rotation_BloodRuneFiller.BloodBoil,
	useAms: false,
	drwDiseases: Deathknight_Rotation_DrwDiseases.Pestilence,
	bloodSpender: Deathknight_Rotation_BloodSpell.HS,
	useDancingRuneWeapon: true
});

export const DefaultFrostRotation = DeathKnightRotation.create({
	useDeathAndDecay: false,
	btGhoulFrenzy: false,
	refreshHornOfWinter: false,
	useEmpowerRuneWeapon: true,
	preNerfedGargoyle: false,
	startingPresence: Deathknight_Rotation_Presence.Blood,
	presence: Deathknight_Rotation_Presence.Blood,
	bloodRuneFiller: Deathknight_Rotation_BloodRuneFiller.BloodBoil,
	useAms: false,
	avgAmsSuccessRate: 1.0,
	avgAmsHit: 10000.0,
	drwDiseases: Deathknight_Rotation_DrwDiseases.Pestilence,
  	frostRotationType: Deathknight_Rotation_FrostRotationType.SingleTarget,
	armyOfTheDead: Deathknight_Rotation_ArmyOfTheDead.PreCast,
  	frostCustomRotation: CustomRotation.create({
		spells: [
			CustomSpell.create({ spell: CustomSpellOption.CustomDeathAndDecay }),
			CustomSpell.create({ spell: CustomSpellOption.CustomIcyTouch }),
			CustomSpell.create({ spell: CustomSpellOption.CustomPlagueStrike }),
			CustomSpell.create({ spell: CustomSpellOption.CustomPestilence }),
			CustomSpell.create({ spell: CustomSpellOption.CustomHowlingBlastRime }),
			CustomSpell.create({ spell: CustomSpellOption.CustomHowlingBlast }),
			CustomSpell.create({ spell: CustomSpellOption.CustomBloodBoil }),
			CustomSpell.create({ spell: CustomSpellOption.CustomObliterate }),
			CustomSpell.create({ spell: CustomSpellOption.CustomFrostStrike }),
		],
	}),
});

export const DefaultBloodRotation = DeathKnightRotation.create({
	refreshHornOfWinter: false,
	useEmpowerRuneWeapon: true,
	preNerfedGargoyle: false,
	startingPresence: Deathknight_Rotation_Presence.Blood,
	bloodRuneFiller: Deathknight_Rotation_BloodRuneFiller.BloodStrike,
	armyOfTheDead: Deathknight_Rotation_ArmyOfTheDead.PreCast,
	holdErwArmy: false,
	useAms: false,
	drwDiseases: Deathknight_Rotation_DrwDiseases.Pestilence,
	bloodSpender: Deathknight_Rotation_BloodSpell.HS,
	useDancingRuneWeapon: true,
});

export const BLOOD_ROTATION_PRESET_LEGACY_DEFAULT = PresetUtils.makePresetLegacyRotation('Blood Legacy', Spec.SpecDeathknight, DefaultBloodRotation, { talentTree: 0 });
export const FROST_ROTATION_PRESET_LEGACY_DEFAULT = PresetUtils.makePresetLegacyRotation('Frost Legacy', Spec.SpecDeathknight, DefaultFrostRotation, { talentTree: 1 });
export const UNHOLY_DW_ROTATION_PRESET_LEGACY_DEFAULT = PresetUtils.makePresetLegacyRotation('Unholy DW Legacy', Spec.SpecDeathknight, DefaultUnholyRotation, { talentTree: 2 });

export const BLOOD_PESTI_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Blood Pesti', BloodPestiApl, { talentTree: 0 });
export const BLOOD_PESTI_DD_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Blood Pesti DD', BloodPestiDDApl, { talentTree: 0 });
export const BLOOD_PESTI_AOE_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Blood Pesti AOE', BloodPestiAoeApl, { talentTree: 0 });
export const FROST_BL_PESTI_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Frost BL Pesti', FrostBlPestiApl, { talentTree: 1 });
export const FROST_UH_PESTI_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Frost UH Pesti', FrostUhPestiApl, { talentTree: 1 });
export const UNHOLY_DW_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Unholy DW SS', UhDwSsApl, { talentTree: 2 });
export const UNHOLY_2H_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Unholy 2H SS', Uh2hSsApl, { talentTree: 2 });
export const UNHOLY_DND_AOE_ROTATION_PRESET_DEFAULT = PresetUtils.makePresetAPLRotation('Unholy DND AOE', UhDndAoeApl, { talentTree: 2 });

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wotlk.wowhead.com/talent-calc and copy the numbers in the url.
export const FrostTalents = {
	name: 'Frost BL',
	data: SavedTalents.create({
		talentsString: '23050005-32005350352203012300033101351',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfObliterate,
			major2: DeathknightMajorGlyph.GlyphOfFrostStrike,
			major3: DeathknightMajorGlyph.GlyphOfDisease,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const FrostUnholyTalents = {
	name: 'Frost UH',
	data: SavedTalents.create({
		talentsString: '01-32002350342203012300033101351-230200305003',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfObliterate,
			major2: DeathknightMajorGlyph.GlyphOfFrostStrike,
			major3: DeathknightMajorGlyph.GlyphOfDisease,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const UnholyDualWieldTalents = {
	name: 'Unholy DW',
	data: SavedTalents.create({
		talentsString: '-320043500002-2300303050032152000150013133051',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfTheGhoul,
			major2: DeathknightMajorGlyph.GlyphOfIcyTouch,
			major3: DeathknightMajorGlyph.GlyphOfDeathAndDecay,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const UnholyDualWieldSSTalents = {
	name: 'Unholy DW SS',
	data: SavedTalents.create({
		talentsString: '-320033500002-2301303050032151000150013133151',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfTheGhoul,
			major2: DeathknightMajorGlyph.GlyphOfIcyTouch,
			major3: DeathknightMajorGlyph.GlyphOfDeathAndDecay,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const Unholy2HTalents = {
	name: 'Unholy 2H',
	data: SavedTalents.create({
		talentsString: '-320050500002-2302003350032052000150013133151',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfTheGhoul,
			major2: DeathknightMajorGlyph.GlyphOfIcyTouch,
			major3: DeathknightMajorGlyph.GlyphOfDarkDeath,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const UnholyAoeTalents = {
	name: 'Unholy AOE',
	data: SavedTalents.create({
		talentsString: '-320050500002-2302303050032052000150013133151',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfTheGhoul,
			major2: DeathknightMajorGlyph.GlyphOfIcyTouch,
			major3: DeathknightMajorGlyph.GlyphOfDeathAndDecay,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const BloodTalents = {
	name: 'Blood DPS',
	data: SavedTalents.create({
		talentsString: '2305120530003303231023001351--2302003050032',
		glyphs: Glyphs.create({
			major1: DeathknightMajorGlyph.GlyphOfDancingRuneWeapon,
			major2: DeathknightMajorGlyph.GlyphOfDeathStrike,
			major3: DeathknightMajorGlyph.GlyphOfDisease,
			minor1: DeathknightMinorGlyph.GlyphOfHornOfWinter,
			minor2: DeathknightMinorGlyph.GlyphOfPestilence,
			minor3: DeathknightMinorGlyph.GlyphOfRaiseDead,
		}),
	}),
};

export const DefaultUnholyOptions = DeathKnightOptions.create({
	drwPestiApply: true,
	startingRunicPower: 0,
	petUptime: 1,
	precastGhoulFrenzy: false,
	precastHornOfWinter: true,
	unholyFrenzyTarget: UnitReference.create(),
	diseaseDowntime: 2,
});

export const DefaultFrostOptions = DeathKnightOptions.create({
	drwPestiApply: true,
	startingRunicPower: 0,
	petUptime: 1,
	precastHornOfWinter: true,
	unholyFrenzyTarget: UnitReference.create(),
	diseaseDowntime: 0,
});

export const DefaultBloodOptions = DeathKnightOptions.create({
	drwPestiApply: true,
	startingRunicPower: 0,
	petUptime: 1,
	precastHornOfWinter: true,
	unholyFrenzyTarget: UnitReference.create(),
	diseaseDowntime: 0,
});

export const OtherDefaults = {
};

export const DefaultConsumes = Consumes.create({
	flask: Flask.FlaskUnknown,
	food: Food.FoodUnknown,
	fillerExplosive: Explosive.ExplosiveGoblinSapperCharge,
});
