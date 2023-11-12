import {
	Consumes,
	CustomRotation,
	CustomSpell,
	Flask,
	Food,
	Glyphs,
} from '../core/proto/common.js';
import { SavedTalents } from '../core/proto/ui.js';

import {
	WarriorShout,
	ProtectionWarrior_Rotation as ProtectionWarriorRotation,
	ProtectionWarrior_Rotation_DemoShoutChoice as DemoShoutChoice,
	ProtectionWarrior_Rotation_ThunderClapChoice as ThunderClapChoice,
	ProtectionWarrior_Options as ProtectionWarriorOptions,
	ProtectionWarrior_Rotation_SpellOption as SpellOption,
	WarriorMajorGlyph,
	WarriorMinorGlyph,
} from '../core/proto/warrior.js';

import * as PresetUtils from '../core/preset_utils.js';

import PreraidBalancedGear from './gear_sets/preraid_balanced.gear.json';
import P1BalancedGear from './gear_sets/p1_balanced.gear.json';
import P2SurvivalGear from './gear_sets/p2_survival.gear.json';

import DefaultApl from './apls/default.apl.json';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

export const PRERAID_BALANCED_PRESET = PresetUtils.makePresetGear('PreRaid Balanced', PreraidBalancedGear);
export const P1_BALANCED_PRESET = PresetUtils.makePresetGear('P1 Balanced Preset', P1BalancedGear);
export const P2_SURVIVAL_PRESET = PresetUtils.makePresetGear('P2 Survival Preset', P2SurvivalGear);

export const DefaultRotation = ProtectionWarriorRotation.create({
	customRotation: CustomRotation.create({
		spells: [
			CustomSpell.create({ spell: SpellOption.ShieldSlam }),
			CustomSpell.create({ spell: SpellOption.Revenge }),
			CustomSpell.create({ spell: SpellOption.Shout }),
			CustomSpell.create({ spell: SpellOption.ThunderClap }),
			CustomSpell.create({ spell: SpellOption.DemoralizingShout }),
			CustomSpell.create({ spell: SpellOption.MortalStrike }),
			CustomSpell.create({ spell: SpellOption.Devastate }),
			CustomSpell.create({ spell: SpellOption.SunderArmor }),
			CustomSpell.create({ spell: SpellOption.ConcussionBlow }),
			CustomSpell.create({ spell: SpellOption.Shockwave }),
		],
	}),
	demoShoutChoice: DemoShoutChoice.DemoShoutChoiceNone,
	thunderClapChoice: ThunderClapChoice.ThunderClapChoiceNone,
	hsRageThreshold: 30,
});

export const ROTATION_DEFAULT = PresetUtils.makePresetAPLRotation('Default', DefaultApl);

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/wotlk/talent-calc and copy the numbers in the url.
export const StandardTalents = {
	name: 'Standard',
	data: SavedTalents.create({
		talentsString: '2500030023-302-053351225000012521030113321',
		glyphs: Glyphs.create({
			major1: WarriorMajorGlyph.GlyphOfBlocking,
			major2: WarriorMajorGlyph.GlyphOfVigilance,
			major3: WarriorMajorGlyph.GlyphOfDevastate,
			minor1: WarriorMinorGlyph.GlyphOfCharge,
			minor2: WarriorMinorGlyph.GlyphOfThunderClap,
			minor3: WarriorMinorGlyph.GlyphOfCommand,
		}),
	}),
};

export const UATalents = {
	name: 'UA',
	data: SavedTalents.create({
		talentsString: '35023301230051002020120002-2-05035122500000252',
		glyphs: Glyphs.create({
			major1: WarriorMajorGlyph.GlyphOfRevenge,
			major2: WarriorMajorGlyph.GlyphOfHeroicStrike,
			major3: WarriorMajorGlyph.GlyphOfSweepingStrikes,
			minor1: WarriorMinorGlyph.GlyphOfCharge,
			minor2: WarriorMinorGlyph.GlyphOfThunderClap,
			minor3: WarriorMinorGlyph.GlyphOfCommand,
		}),
	}),
};

export const DefaultOptions = ProtectionWarriorOptions.create({
	shout: WarriorShout.WarriorShoutCommanding,
	useShatteringThrow: false,
	startingRage: 0,
});

export const DefaultConsumes = Consumes.create({
	flask: Flask.FlaskUnknown,
	food: Food.FoodUnknown,
});
