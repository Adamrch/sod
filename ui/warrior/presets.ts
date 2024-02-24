import { Phase } from '../core/constants/other.js';
import {
	AgilityElixir,
	Consumes,
	Debuffs,
	EnchantedSigil,
	Food,
	IndividualBuffs,
	Profession,
	RaidBuffs,
	SaygesFortune,
	StrengthBuff,
	TristateEffect,
	WeaponImbue,
} from '../core/proto/common.js';
import { SavedTalents } from '../core/proto/ui.js';

import {
	WarriorShout,
	Warrior_Options as WarriorOptions,
} from '../core/proto/warrior.js';

import * as PresetUtils from '../core/preset_utils.js';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

///////////////////////////////////////////////////////////////////////////
//                                 Gear Presets
///////////////////////////////////////////////////////////////////////////

import Phase1Gear from './gear_sets/phase_1.gear.json';
import Phase1DWGear from './gear_sets/phase_1_dw.gear.json';
import Phase2DWGear from './gear_sets/phase_2_dw.gear.json';
import Phase22HGear from './gear_sets/phase_2_2H.json';

export const GearArmsPhase1 = PresetUtils.makePresetGear('P1 Arms 2H', Phase1Gear, { talentTree: 0 });
export const GearArmsDWPhase1 = PresetUtils.makePresetGear('P1 Arms DW', Phase1DWGear, { talentTree: 0 });
export const GearArmsPhase2 = PresetUtils.makePresetGear('P2 Arms', Phase22HGear, { talentTree: 0 });
export const GearFuryPhase1 = PresetUtils.makePresetGear('P1 Fury', Phase1Gear, { talentTree: 1 });
export const GearFuryPhase2 = PresetUtils.makePresetGear('P2 Fury', Phase2DWGear, { talentTree: 1 });


export const GearPresets = {
  [Phase.Phase1]: [
		GearArmsPhase1,
		GearFuryPhase1,
		GearArmsDWPhase1,
  ],
  [Phase.Phase2]: [
		GearArmsPhase2,
		GearFuryPhase2,
  ]
};

export const DefaultGear = GearPresets[Phase.Phase2][0];

///////////////////////////////////////////////////////////////////////////
//                                 APL Presets
///////////////////////////////////////////////////////////////////////////

import Phase1APLArms from './apls/phase_1_arms.apl.json';
import Phase2APLArms from './apls/phase_2_arms.apl.json';
import Phase2APLFury from './apls/phase_2_fury.apl.json';


export const APLPhase1Arms = PresetUtils.makePresetAPLRotation('P1 Preset Arms', Phase1APLArms);
export const APLPhase2Arms = PresetUtils.makePresetAPLRotation('P2 Preset Arms', Phase2APLArms);
export const APLPhase2Fury = PresetUtils.makePresetAPLRotation('P2 Preset Fury', Phase2APLFury);




export const APLPresets = {
  [Phase.Phase1]: [
    APLPhase1Arms,
  ],
  [Phase.Phase2]: [
	APLPhase2Arms,
	APLPhase2Fury,
  ]
};

// TODO: Add Phase 2 preset and pull from map
export const DefaultAPLs: Record<number, Record<number, PresetUtils.PresetRotation>> = {
  25: {
		0: APLPresets[Phase.Phase1][0],
		1: APLPresets[Phase.Phase1][0],
		2: APLPresets[Phase.Phase1][0],
	},
  40: {
		0: APLPresets[Phase.Phase2][0],
		1: APLPresets[Phase.Phase2][1],
		2: APLPresets[Phase.Phase2][0],
	}
};

///////////////////////////////////////////////////////////////////////////
//                                 Talent Presets
///////////////////////////////////////////////////////////////////////////

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/classic/talent-calc and copy the numbers in the url.

export const TalentsPhase1 = {
	name: 'Level 25',
	data: SavedTalents.create({
		talentsString: '303220203-01',
	}),
};

export const TalentsPhase2Fury = {
	name: 'Level 40 Fury',
	data: SavedTalents.create({
		talentsString: '-05050005405010051',
	}),
};

export const TalentsPhase2Arms = {
	name: 'Level 40 Arms',
	data: SavedTalents.create({
		talentsString: '303050213525100001',
	}),
};


export const TalentPresets = {
  [Phase.Phase1]: [
    TalentsPhase1,
  ],
  [Phase.Phase2]: [
	TalentsPhase2Arms,
	TalentsPhase2Fury,
  ]
};

export const DefaultTalentsPhase1Arms = TalentPresets[Phase.Phase1][0];
export const DefaultTalentsPhase2Fury = TalentPresets[Phase.Phase2][0];
export const DefaultTalentsPhase2Arms = TalentPresets[Phase.Phase2][1];

export const DefaultTalents = DefaultTalentsPhase2Arms;

///////////////////////////////////////////////////////////////////////////
//                                 Options Presets
///////////////////////////////////////////////////////////////////////////

export const DefaultOptions = WarriorOptions.create({
	startingRage: 0,
	useRecklessness: true,
	shout: WarriorShout.WarriorShoutBattle,
});

export const DefaultConsumes = Consumes.create({
	agilityElixir: AgilityElixir.ElixirOfAgility,
	enchantedSigil: EnchantedSigil.InnovationSigil,
	food: Food.FoodGrilledSquid,
	mainHandImbue: WeaponImbue.WildStrikes,
	offHandImbue: WeaponImbue.DenseSharpeningStone,
	strengthBuff: StrengthBuff.ElixirOfOgresStrength,
});

export const DefaultRaidBuffs = RaidBuffs.create({
	battleShout: TristateEffect.TristateEffectImproved,
	devotionAura: TristateEffect.TristateEffectImproved,
	giftOfTheWild: TristateEffect.TristateEffectImproved,
	leaderOfThePack: true,
	stoneskinTotem: TristateEffect.TristateEffectImproved,
	trueshotAura: true,
})

export const DefaultIndividualBuffs = IndividualBuffs.create({
  blessingOfMight: TristateEffect.TristateEffectImproved,
  blessingOfKings: true,
	blessingOfWisdom: TristateEffect.TristateEffectRegular,
  sparkOfInspiration: true,
  saygesFortune: SaygesFortune.SaygesDamage
});

export const DefaultDebuffs = Debuffs.create({
	curseOfRecklessness: true,
	faerieFire: true,
	homunculi: 70, // 70% average uptime default
	mangle: true,
	sunderArmor: true,
})

export const OtherDefaults = {
  profession1: Profession.Enchanting,
  profession2: Profession.Leatherworking,
}
