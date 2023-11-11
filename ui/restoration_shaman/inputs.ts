import { Spec } from '../core/proto/common.js';
import { Player } from '../core/player.js';
import { ActionId } from '../core/proto_utils/action_id.js';
import { EventID } from '../core/typed_event.js';

import {
	ShamanHealSpell,
	ShamanShield,
	RestorationShaman_Rotation_BloodlustUse,
} from '../core/proto/shaman.js';

import * as InputHelpers from '../core/components/input_helpers.js';

// Configuration for spec-specific UI elements on the settings tab.
// These don't need to be in a separate file but it keeps things cleaner.

export const ShamanShieldInput = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecRestorationShaman, ShamanShield>({
	fieldName: 'shield',
	values: [
		{ value: ShamanShield.NoShield, tooltip: 'No Shield' },
		{ actionId: ActionId.fromSpellId(57960), value: ShamanShield.WaterShield },
		{ actionId: ActionId.fromSpellId(49281), value: ShamanShield.LightningShield },
	],
});


export const PrimaryHealInput = InputHelpers.makeRotationEnumInput<Spec.SpecRestorationShaman, ShamanHealSpell>({
	fieldName: 'primaryHeal',
	label: 'Primary Heal',
	labelTooltip: 'Set to \'AutoHeal\', to automatically swap based on best heal.',
	values: [
		{
			name: "Auto Heal",
			value: ShamanHealSpell.AutoHeal
		},
		{
			name: "Lesser Healing Wave",
			value: ShamanHealSpell.LesserHealingWave // actionId: ActionId.fromSpellId(49276),
		},
		{
			name: "Healing Wave",
			value: ShamanHealSpell.HealingWave // actionId: ActionId.fromSpellId(49273),
		},
		{
			name: "Chain Heal",
			value: ShamanHealSpell.ChainHeal // actionId: ActionId.fromSpellId(55459),
		},
	]
});


export const RestorationShamanRotationConfig = {
	inputs: [
		PrimaryHealInput,
		InputHelpers.makeRotationBooleanInput<Spec.SpecRestorationShaman>({
			fieldName: 'bloodlust',
			label: 'Use Bloodlust',
			labelTooltip: 'Player will cast bloodlust',
			getValue: (player: Player<Spec.SpecRestorationShaman>) => player.getRotation().bloodlust == RestorationShaman_Rotation_BloodlustUse.UseBloodlust,
			setValue: (eventID: EventID, player: Player<Spec.SpecRestorationShaman>, newValue: boolean) => {
				const newRotation = player.getRotation();
				if (newValue) {
					newRotation.bloodlust = RestorationShaman_Rotation_BloodlustUse.UseBloodlust;
				} else {
					newRotation.bloodlust = RestorationShaman_Rotation_BloodlustUse.NoBloodlust;
				}
				player.setRotation(eventID, newRotation);
			},
		}),
	],
};

