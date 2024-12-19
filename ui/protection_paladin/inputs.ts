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
	numColumns: 4,
	values: [
		{ value: PaladinSoul.NoSoul, tooltip: 'No Soul' },
		{ actionId: () => ActionId.fromSpellId(456536), value: PaladinSoul.PristineBlocker, tooltip: 'PristineBlocker' }, // 236530
		{ actionId: () => ActionId.fromSpellId(456538), value: PaladinSoul.Lightwarden, tooltip: 'Lightwarden' }, // 236531
		{ actionId: () => ActionId.fromSpellId(456541), value: PaladinSoul.RadiantDefender, tooltip: 'RadiantDefender' }, // 236532
		{ actionId: () => ActionId.fromSpellId(467531), value: PaladinSoul.Shieldbearer, tooltip: 'Shieldbearer' }, // 236533
		{ actionId: () => ActionId.fromSpellId(467532), value: PaladinSoul.Bastion, tooltip: 'Bastion' }, // 236534
		{ actionId: () => ActionId.fromSpellId(467536), value: PaladinSoul.Reckoner, tooltip: 'Reckoner' }, // 236535
		{ actionId: () => ActionId.fromSpellId(1213410), value: PaladinSoul.Ironclad, tooltip: 'Ironclad' }, // 236536
		{ actionId: () => ActionId.fromSpellId(1213413), value: PaladinSoul.Guardian, tooltip: 'Guardian' }, // 236537
		{ actionId: () => ActionId.fromSpellId(456488), value: PaladinSoul.Peacekeeper, tooltip: 'Peacekeeper' }, // 236538
		{ actionId: () => ActionId.fromSpellId(457323), value: PaladinSoul.Refined, tooltip: 'Refined' }, // 236539
		{ actionId: () => ActionId.fromSpellId(456492), value: PaladinSoul.Exemplar, tooltip: 'Exemplar' }, // 236540
		{ actionId: () => ActionId.fromSpellId(467506), value: PaladinSoul.Inquisitor, tooltip: 'Inquisitor' }, // 236541
		{ actionId: () => ActionId.fromSpellId(467507), value: PaladinSoul.Sovereign, tooltip: 'Sovereign' }, // 236542
		{ actionId: () => ActionId.fromSpellId(467513), value: PaladinSoul.Dominus, tooltip: 'Dominus' }, // 236543
		{ actionId: () => ActionId.fromSpellId(1213349), value: PaladinSoul.Vindicator, tooltip: 'Vindicator' }, // 236544
		{ actionId: () => ActionId.fromSpellId(1213353), value: PaladinSoul.Altruist, tooltip: 'Altruist' }, // 236545
		{ actionId: () => ActionId.fromSpellId(456494), value: PaladinSoul.Arbiter, tooltip: 'Arbiter' }, // 236546
		{ actionId: () => ActionId.fromSpellId(456533), value: PaladinSoul.Sealbearer, tooltip: 'Sealbearer' }, // 236547
		{ actionId: () => ActionId.fromSpellId(467518), value: PaladinSoul.Justicar, tooltip: 'Justicar' }, // 236548
		{ actionId: () => ActionId.fromSpellId(467526), value: PaladinSoul.Judicator, tooltip: 'Judicator' }, // 236549
		{ actionId: () => ActionId.fromSpellId(467529), value: PaladinSoul.Ascendant, tooltip: 'Ascendant' }, // 236550
		{ actionId: () => ActionId.fromSpellId(1213397), value: PaladinSoul.Retributor, tooltip: 'Retributor' }, // 236551
		{ actionId: () => ActionId.fromSpellId(1213406), value: PaladinSoul.Excommunicator, tooltip: 'Excommunicator' }, // 236552
		{ actionId: () => ActionId.fromSpellId(468428), value: PaladinSoul.Lightbringer, tooltip: 'Lightbringer' }, // 236553
		{ actionId: () => ActionId.fromSpellId(468431), value: PaladinSoul.Exile, tooltip: 'Exile' }, // 236554
		{ actionId: () => ActionId.fromSpellId(123467), value: PaladinSoul.Templar, tooltip: 'Templar'}, // 236555
	],
	// changeEmitter: (player: Player<Spec.SpecRetributionPaladin>) => player.changeEmitter,
	changeEmitter: (player: Player<Spec.SpecProtectionPaladin>) =>
		TypedEvent.onAny([player.gearChangeEmitter, player.talentsChangeEmitter, player.specOptionsChangeEmitter, player.levelChangeEmitter]),
});
