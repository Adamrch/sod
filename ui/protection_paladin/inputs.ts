import * as InputHelpers from '../core/components/input_helpers.js';
import { Player } from '../core/player.js';
import { ItemSlot, Spec } from '../core/proto/common.js';
import { PaladinRune, PaladinSeal, PaladinAura, Blessings, PaladinSoul } from '../core/proto/paladin.js';
import { ActionId } from '../core/proto_utils/action_id.js';
import { TypedEvent } from '../core/typed_event.js';
// Configuration for spec-specific UI elements on the settings tab.
// These don't need to be in a separate file but it keeps things cleaner.

export const AuraSelection = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecProtectionPaladin, PaladinAura>({
	fieldName: 'aura',
	values: [
		{ value: PaladinAura.NoPaladinAura, tooltip: 'No Aura' },
		{ actionId: () => ActionId.fromSpellId(20218), value: PaladinAura.SanctityAura },
		//{ actionId: () => ActionId.fromSpellId(10299), value: PaladinAura.DevotionAura },
		//{ actionId: () => ActionId.fromSpellId(10299), value: PaladinAura.RetributionAura },
		//{ actionId: () => ActionId.fromSpellId(19746), value: PaladinAura.ConcentrationAura },
		//{ actionId: () => ActionId.fromSpellId(19888), value: PaladinAura.FrostResistanceAura },
		//{ actionId: () => ActionId.fromSpellId(19892), value: PaladinAura.ShadowResistanceAura },
		//{ actionId: () => ActionId.fromSpellId(19891), value: PaladinAura.FireResistanceAura },
	],
});

export const BlessingSelection = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecProtectionPaladin, Blessings>({
	fieldName: 'personalBlessing',
	values: [
		{ value: Blessings.BlessingUnknown, tooltip: 'No Blessing' },
		{
			actionId: player =>
				player.getMatchingSpellActionId([
					{ id: 20911, minLevel: 1, maxLevel: 39 },
					{ id: 20912, minLevel: 40, maxLevel: 49 },
					{ id: 20913, minLevel: 50, maxLevel: 59 },
					{ id: 20914, minLevel: 60 },
				]),
			value: Blessings.BlessingOfSanctuary,
		},
	],
	changeEmitter: (player: Player<Spec.SpecProtectionPaladin>) => TypedEvent.onAny([player.specOptionsChangeEmitter, player.levelChangeEmitter]),
});

export const RighteousFuryToggle = InputHelpers.makeSpecOptionsBooleanIconInput<Spec.SpecProtectionPaladin>({
	fieldName: 'righteousFury',
	actionId: (player: Player<Spec.SpecProtectionPaladin>) =>
		player.hasRune(ItemSlot.ItemSlotHands, PaladinRune.RuneHandsHandOfReckoning) ? ActionId.fromSpellId(407627) : ActionId.fromSpellId(25780),
	changeEmitter: (player: Player<Spec.SpecProtectionPaladin>) => TypedEvent.onAny([player.gearChangeEmitter, player.specOptionsChangeEmitter]),
});

// The below is used in the custom APL action "Cast Primary Seal".
// Only shows SoC if it's talented.
export const PrimarySealSelection = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecProtectionPaladin, PaladinSeal>({
	fieldName: 'primarySeal',
	values: [
		{
			actionId: player =>
				player.getMatchingSpellActionId([
					{ id: 20154, maxLevel: 9 },
					{ id: 20287, minLevel: 10, maxLevel: 17 },
					{ id: 20288, minLevel: 18, maxLevel: 25 },
					{ id: 20289, minLevel: 26, maxLevel: 33 },
					{ id: 20290, minLevel: 34, maxLevel: 41 },
					{ id: 20291, minLevel: 42, maxLevel: 49 },
					{ id: 20292, minLevel: 50, maxLevel: 57 },
					{ id: 20293, minLevel: 58 },
				]),
			value: PaladinSeal.Righteousness,
		},
		{
			actionId: player =>
				player.getMatchingSpellActionId([
					{ id: 20375, maxLevel: 29 },
					{ id: 20915, minLevel: 30, maxLevel: 39 },
					{ id: 20918, minLevel: 40, maxLevel: 49 },
					{ id: 20919, minLevel: 50, maxLevel: 59 },
					{ id: 20920, minLevel: 60 },
				]),
			value: PaladinSeal.Command,
			showWhen: (player: Player<Spec.SpecProtectionPaladin>) => player.getTalents().sealOfCommand,
		},
		{
			actionId: () => ActionId.fromSpellId(407798),
			value: PaladinSeal.Martyrdom,
		},
	],
	changeEmitter: (player: Player<Spec.SpecProtectionPaladin>) =>
		TypedEvent.onAny([player.gearChangeEmitter, player.talentsChangeEmitter, player.specOptionsChangeEmitter, player.levelChangeEmitter]),
});


export const SoulSelection = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecProtectionPaladin, PaladinSoul>({
	fieldName: 'paladinSoul',
	values: [
		{ value: PaladinSoul.NoSoul, tooltip: 'No Soul' },
		{ actionId: () => ActionId.fromSpellId(236530), value: PaladinSoul.PristineBlocker, tooltip: 'PristineBlocker' },
		{ actionId: () => ActionId.fromSpellId(236531), value: PaladinSoul.Lightwarden, tooltip: 'Lightwarden' },
		{ actionId: () => ActionId.fromSpellId(236532), value: PaladinSoul.RadiantDefender, tooltip: 'RadiantDefender' },
		{ actionId: () => ActionId.fromSpellId(236533), value: PaladinSoul.Shieldbearer, tooltip: 'Shieldbearer' },
		{ actionId: () => ActionId.fromSpellId(236534), value: PaladinSoul.Bastion, tooltip: 'Bastion' },
		{ actionId: () => ActionId.fromSpellId(236535), value: PaladinSoul.Reckoner, tooltip: 'Reckoner' },
		{ actionId: () => ActionId.fromSpellId(236536), value: PaladinSoul.Ironclad, tooltip: 'Ironclad' },
		{ actionId: () => ActionId.fromSpellId(236537), value: PaladinSoul.Guardian, tooltip: 'Guardian' },
		//{ actionId: () => ActionId.fromSpellId(236538), value: PaladinSoul.Peacekeeper, tooltip: 'Peacekeeper' },
		{ actionId: () => ActionId.fromSpellId(236539), value: PaladinSoul.Refined, tooltip: 'Refined' },
		//{ actionId: () => ActionId.fromSpellId(236540), value: PaladinSoul.Exemplar, tooltip: 'Exemplar' },
		//{ actionId: () => ActionId.fromSpellId(236541), value: PaladinSoul.Inquisitor, tooltip: 'Inquisitor' },
		{ actionId: () => ActionId.fromSpellId(236542), value: PaladinSoul.Sovereign, tooltip: 'Sovereign' },
		//{ actionId: () => ActionId.fromSpellId(236543), value: PaladinSoul.Dominus, tooltip: 'Dominus' },
		//{ actionId: () => ActionId.fromSpellId(236544), value: PaladinSoul.Vindicator, tooltip: 'Vindicator' },
		//{ actionId: () => ActionId.fromSpellId(236545), value: PaladinSoul.Altruist, tooltip: 'Altruist' },
		//{ actionId: () => ActionId.fromSpellId(236546), value: PaladinSoul.Arbiter, tooltip: 'Arbiter' },
		{ actionId: () => ActionId.fromSpellId(236547), value: PaladinSoul.Sealbearer, tooltip: 'Sealbearer' },
		{ actionId: () => ActionId.fromSpellId(236548), value: PaladinSoul.Justicar, tooltip: 'Justicar' },
		{ actionId: () => ActionId.fromSpellId(236549), value: PaladinSoul.Judicator, tooltip: 'Judicator' },
		{ actionId: () => ActionId.fromSpellId(236550), value: PaladinSoul.Ascendant, tooltip: 'Ascendant' },
		{ actionId: () => ActionId.fromSpellId(236551), value: PaladinSoul.Retributor, tooltip: 'Retributor' },
		{ actionId: () => ActionId.fromSpellId(236552), value: PaladinSoul.Excommunicator, tooltip: 'Excommunicator' },
		//{ actionId: () => ActionId.fromSpellId(236553), value: PaladinSoul.Lightbringer, tooltip: 'Lightbringer' },
		{ actionId: () => ActionId.fromSpellId(236554), value: PaladinSoul.Exile, tooltip: 'Exile' },
		{ actionId: () => ActionId.fromSpellId(236555), value: PaladinSoul.Templar, tooltip: 'Templar' },
	],
	// changeEmitter: (player: Player<Spec.SpecRetributionPaladin>) => player.changeEmitter,
	changeEmitter: (player: Player<Spec.SpecProtectionPaladin>) =>
		TypedEvent.onAny([player.gearChangeEmitter, player.talentsChangeEmitter, player.specOptionsChangeEmitter, player.levelChangeEmitter]),
});
