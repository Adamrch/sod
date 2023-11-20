import {
	Consumes,
	Flask,
	Food,
} from '../core/proto/common.js';
import { SavedTalents } from '../core/proto/ui.js';

import {
	PaladinAura,
	PaladinMajorGlyph,
	PaladinMinorGlyph,
	PaladinJudgement,
	HolyPaladin_Rotation as HolyPaladinRotation,
	HolyPaladin_Options as HolyPaladinOptions,
} from '../core/proto/paladin.js';

import * as PresetUtils from '../core/preset_utils.js';

import PreraidGear from './gear_sets/preraid.gear.json';
import P1Gear from './gear_sets/p1.gear.json';
import P2Gear from './gear_sets/p2.gear.json';

// Preset options for this spec.
// Eventually we will import these values for the raid sim too, so its good to
// keep them in a separate file.

export const PRERAID_PRESET = PresetUtils.makePresetGear('PreRaid', PreraidGear);
export const P1_PRESET = PresetUtils.makePresetGear('P1 Preset', P1Gear);
export const P2_PRESET = PresetUtils.makePresetGear('P2 Preset', P2Gear);

// Default talents. Uses the wowhead calculator format, make the talents on
// https://wowhead.com/wotlk/talent-calc and copy the numbers in the url.

export const StandardTalents = {
	name: 'Standard',
	data: SavedTalents.create({
		talentsString: '50350151020013053100515221-50023131203',
		glyphs: {
			major1: PaladinMajorGlyph.GlyphOfHolyLight,
			major2: PaladinMajorGlyph.GlyphOfSealOfWisdom,
			major3: PaladinMajorGlyph.GlyphOfBeaconOfLight,
			minor2: PaladinMinorGlyph.GlyphOfLayOnHands,
			minor1: PaladinMinorGlyph.GlyphOfSenseUndead,
			minor3: PaladinMinorGlyph.GlyphOfBlessingOfKings
		}
	}),
};

export const DefaultRotation = HolyPaladinRotation.create({
});

export const DefaultOptions = HolyPaladinOptions.create({
	aura: PaladinAura.DevotionAura,
	judgement: PaladinJudgement.NoJudgement,
});

export const DefaultConsumes = Consumes.create({
	flask: Flask.FlaskUnknown,
	food: Food.FoodUnknown,
});
