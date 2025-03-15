package paladin

import (
	"time"

	"github.com/wowsims/sod/sim/core"
	"github.com/wowsims/sod/sim/core/proto"
	"github.com/wowsims/sod/sim/core/stats"
)

var ItemSetRedemptionWarplate = core.NewItemSet(core.ItemSet{
	Name: "Redemption Warplate",
	Bonuses: map[int32]core.ApplyEffect{
		2: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasRetribution2PBonus()
		},
		4: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasRetribution4PBonus()
		},
		6: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasRetribution6PBonus()
		},
	},
})

// Increases the damage done by your Divine Storm ability by 100%.
func (paladin *Paladin) applyNaxxramasRetribution2PBonus() {
	if !paladin.hasRune(proto.PaladinRune_RuneChestDivineStorm) {
		return
	}

	label := "S03 - Item - Naxxramas - Paladin - Retribution 2P Bonus"
	if paladin.HasAura(label) {
		return
	}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		ActionID: core.ActionID{SpellID: PaladinT3Ret2P},
		Label:    label,
	}).AttachSpellMod(core.SpellModConfig{
		Kind:      core.SpellMod_DamageDone_Flat,
		ClassMask: ClassSpellMask_PaladinDivineStorm,
		IntValue:  100,
	}))

	paladin.applyPaladinSERet()
}

// Reduces the cast time of your Holy Wrath ability by 100%, reduces its cooldown by 25%, and reduces its mana cost by 75%.
func (paladin *Paladin) applyNaxxramasRetribution4PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Retribution 4P Bonus"
	if paladin.HasAura(label) {
		return
	}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		ActionID: core.ActionID{SpellID: PaladinT3Ret4P},
		Label:    label,
	})).AttachSpellMod(core.SpellModConfig{
		ClassMask:  ClassSpellMask_PaladinHolyWrath,
		Kind:       core.SpellMod_CastTime_Pct,
		FloatValue: -1.0,
	}).AttachSpellMod(core.SpellModConfig{
		ClassMask: ClassSpellMask_PaladinHolyWrath,
		Kind:      core.SpellMod_Cooldown_Multi_Flat,
		IntValue:  -25,
	}).AttachSpellMod(core.SpellModConfig{
		ClassMask: ClassSpellMask_PaladinHolyWrath,
		Kind:      core.SpellMod_PowerCost_Pct,
		IntValue:  -75,
	})
}

// Your Crusader Strike, Divine Storm, Exorcism and Holy Wrath abilities deal increased damage to Undead equal to their critical strike chance.
func (paladin *Paladin) applyNaxxramasRetribution6PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Retribution 6P Bonus"
	if paladin.HasAura(label) {
		return
	}

	hasWrathRune := paladin.hasRune(proto.PaladinRune_RuneHeadWrath)

	classSpellMasks := ClassSpellMask_PaladinExorcism | ClassSpellMask_PaladinHolyWrath | ClassSpellMask_PaladinDivineStorm | ClassSpellMask_PaladinCrusaderStrike
	damageMod := paladin.AddDynamicMod(core.SpellModConfig{
		Kind:       core.SpellMod_DamageDone_Pct,
		ClassMask:  classSpellMasks,
		FloatValue: 1,
	})

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		ActionID: core.ActionID{SpellID: PaladinT3Ret6P},
		Label:    label,
		OnGain: func(aura *core.Aura, sim *core.Simulation) {
			damageMod.Activate()
		},
		OnExpire: func(aura *core.Aura, sim *core.Simulation) {
			damageMod.Deactivate()
		},
		OnApplyEffects: func(aura *core.Aura, sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			if !spell.Matches(classSpellMasks) || target.MobType != proto.MobType_MobTypeUndead {
				return
			}

			critChanceBonusPct := 100.0

			if spell.Matches(ClassSpellMask_PaladinExorcism | ClassSpellMask_PaladinHolyWrath) {
				critChanceBonusPct += paladin.GetStat(stats.SpellCrit) + paladin.GetSchoolBonusCritChance(spell)

				if hasWrathRune {
					critChanceBonusPct += paladin.GetStat(stats.MeleeCrit)
				}
			} else {
				critChanceBonusPct += paladin.GetStat(stats.MeleeCrit)
			}

			if spell.Matches(ClassSpellMask_PaladinExorcism) {
				critChanceBonusPct += 100
			}

			damageMod.UpdateFloatValue(critChanceBonusPct / 100)
		},
	}))
}

var ItemSetRedemptionBulwark = core.NewItemSet(core.ItemSet{
	Name: "Redemption Bulwark",
	Bonuses: map[int32]core.ApplyEffect{
		2: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasProtection2PBonus()
		},
		4: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasProtection4PBonus()
		},
		6: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasProtection6PBonus()
		},
	},
})

// Your Hand of Reckoning ability never misses, and your chance to be Dodged or Parried is reduced by 2%.
func (paladin *Paladin) applyNaxxramasProtection2PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Protection 2P Bonus"
	if paladin.HasAura(label) {
		return
	}

	bonusStats := stats.Stats{stats.Expertise: 2 * core.ExpertiseRatingPerExpertiseChance}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		ActionID:   core.ActionID{SpellID: PaladinT3Prot2P},
		Label:      label,
		BuildPhase: core.CharacterBuildPhaseBuffs,
	}).AttachStatsBuff(bonusStats))
}

// Reduces the cooldown on your Divine Protection ability by 3 min and reduces the cooldown on your Avenging Wrath ability by 2 min.
func (paladin *Paladin) applyNaxxramasProtection4PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Protection 4P Bonus"
	if paladin.HasAura(label) {
		return
	}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		ActionID: core.ActionID{SpellID: PaladinT3Prot4P},
		Label:    label,
	}).AttachSpellMod(core.SpellModConfig{
		Kind:      core.SpellMod_Cooldown_Flat,
		ClassMask: ClassSpellMask_PaladinDivineProtection,
		TimeValue: -time.Minute * 3,
	}).AttachSpellMod(core.SpellModConfig{
		Kind:      core.SpellMod_Cooldown_Flat,
		ClassMask: ClassSpellMask_PaladinavengingWrath,
		TimeValue: -time.Minute * 2,
	}))
}

// When damage from an Undead enemy takes you below 35% health, the effect from Hand of Reckoning and Righteous Fury now reduces that damage by 50%.
func (paladin *Paladin) applyNaxxramasProtection6PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Protection 6P Bonus"
	if paladin.HasAura(label) {
		return
	}

	paladin.RegisterAura(core.Aura{
		ActionID: core.ActionID{SpellID: PaladinT3Prot6P},
		Label:    label,
		OnInit: func(aura *core.Aura, sim *core.Simulation) {
			// Implemented in righteous_fury.go
		},
	})
}

var ItemSetRedemptionArmor = core.NewItemSet(core.ItemSet{
	Name: "Redemption Armor",
	Bonuses: map[int32]core.ApplyEffect{
		2: func(agent core.Agent) {
			paladin := agent.(PaladinAgent).GetPaladin()
			paladin.applyNaxxramasHoly2PBonus()
		},
		// Your Flash of Light Rank 6 and Holy Light Rank 8 and Rank 9 spells have a 10% chance to imbue your target with Holy Power.
		4: func(agent core.Agent) {
		},
		// Your Beacon of Light target takes 20% reduced damage from Undead enemies.
		6: func(agent core.Agent) {
		},
	},
})

// Reduces the cooldown on your Lay on Hands ability by 35 min, and your Lay on Hands now restores you to 30% of your maximum Mana when used.
func (paladin *Paladin) applyNaxxramasHoly2PBonus() {
	label := "S03 - Item - Naxxramas - Paladin - Holy 2P Bonus"
	if paladin.HasAura(label) {
		return
	}

	// AddMana effect is implemented in lay_on_hands.go:47
	core.MakePermanent(paladin.RegisterAura(core.Aura{
		Label: label,
	}).AttachSpellMod(core.SpellModConfig{
		Kind:      core.SpellMod_Cooldown_Flat,
		ClassMask: ClassSpellMask_PaladinLayOnHands,
		TimeValue: -time.Minute * 35,
	}))
}

func (paladin *Paladin) applyPaladinSERet() {
	paladin.applyPaladinSERet2P()
	//paladin.applyPaladinSERet4P()
	//paladin.applyPaladinSERet6P()
}

func (paladin *Paladin) applyPaladinSERet2P() {
	bonusLabel := "S03 - Item - Scarlet Enclave - Paladin - Retribution 2P Bonus"

	if paladin.HasAura(bonusLabel) {
		return
	}

	// For 4pc Spenders
	damageMod := paladin.AddDynamicMod(core.SpellModConfig{
		Kind:      core.SpellMod_DamageDone_Flat,
		ClassMask: ClassSpellMask_PaladinDivineStorm | ClassSpellMask_PaladinHolyShock,
	})

	buffAura := paladin.GetOrRegisterAura(core.Aura{
		Label:     "Holy Power Spell Damage Mod",
		ActionID:  core.ActionID{SpellID: 1217927},
		MaxStacks: 3,
		Duration:  core.NeverExpires,
		OnStacksChange: func(aura *core.Aura, sim *core.Simulation, oldStacks int32, newStacks int32) {
			damageMod.UpdateIntValue(100 * int64(newStacks))
		},
		OnGain: func(aura *core.Aura, sim *core.Simulation) {
			damageMod.Activate()
		},
		OnExpire: func(aura *core.Aura, sim *core.Simulation) {
			damageMod.Activate()
		},
	})

	// 2 PC Holy Power Aura
	holyPowerAura := paladin.GetOrRegisterAura(core.Aura{
		Label:     "Holy Power",
		ActionID:  core.ActionID{SpellID: 1226461},
		MaxStacks: 3,
		Duration:  core.NeverExpires,
		OnStacksChange: func(aura *core.Aura, sim *core.Simulation, oldStacks int32, newStacks int32) {
			aura.Unit.PseudoStats.SchoolDamageDealtMultiplier[stats.SchoolIndexHoly] *= ((1.0 + (0.2 * float64(newStacks))) / (1.0 + (0.2 * float64(oldStacks))))
		},
	})

	apAuraMultiplier := []*stats.StatDependency{
		paladin.NewDynamicMultiplyStat(stats.AttackPower, 1.0),
		paladin.NewDynamicMultiplyStat(stats.AttackPower, 1.1),
		paladin.NewDynamicMultiplyStat(stats.AttackPower, 1.2),
		paladin.NewDynamicMultiplyStat(stats.AttackPower, 1.3),
	}

	apAura := paladin.RegisterAura(core.Aura{
		Label:     "Holy Power AP",
		ActionID:  core.ActionID{SpellID: 1220545},
		Duration:  time.Second * 10,
		MaxStacks: 3,
		OnInit: func(aura *core.Aura, sim *core.Simulation) {
			paladin.EnableDynamicStatDep(sim, apAuraMultiplier[0])
		},
		OnStacksChange: func(aura *core.Aura, sim *core.Simulation, oldStacks int32, newStacks int32) {
			paladin.DisableDynamicStatDep(sim, apAuraMultiplier[oldStacks])
			paladin.EnableDynamicStatDep(sim, apAuraMultiplier[newStacks])
		},
	})

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		Label: bonusLabel,
		//ActionID: core.ActionID{SpellID: PaladinTAQRet4P},
		Duration: core.NeverExpires,
		OnReset: func(aura *core.Aura, sim *core.Simulation) {
			aura.Activate(sim)
		},
		OnSpellHitDealt: func(aura *core.Aura, sim *core.Simulation, spell *core.Spell, result *core.SpellResult) {
			if spell.Matches(ClassSpellMask_PaladinExorcism | ClassSpellMask_PaladinCrusaderStrike) {
				holyPowerAura.Activate(sim)
				holyPowerAura.AddStack(sim)

				if spell.Unit.HasAura("S03 - Item - Scarlet Enclave - Paladin - Retribution 4P Bonus") {
					buffAura.Activate(sim)
					buffAura.SetStacks(sim, holyPowerAura.GetStacks())
				}

			} else if spell.Matches(ClassSpellMask_PaladinDivineStorm | ClassSpellMask_PaladinHolyShock) {

				if spell.Unit.HasAura("S03 - Item - Scarlet Enclave - Paladin - Retribution 4P Bonus") { // Need 4Pc to Spend Holy Power
					buffAura.Deactivate(sim)

					if spell.Unit.HasAura("S03 - Item - Scarlet Enclave - Paladin - Retribution 6P Bonus") { // Need 6Pc
						apAura.Activate(sim)
						apAura.SetStacks(sim, holyPowerAura.GetStacks())
					}

					holyPowerAura.SetStacks(sim, 0)
				}

			}
		},
	}))
}

func (paladin *Paladin) applyPaladinSERet4P() {
	bonusLabel := "S03 - Item - Scarlet Enclave - Paladin - Retribution 4P Bonus"

	if paladin.HasAura(bonusLabel) {
		return
	}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		Label: bonusLabel,
	}))
}

func (paladin *Paladin) applyPaladinSERet6P() {
	bonusLabel := "S03 - Item - Scarlet Enclave - Paladin - Retribution 6P Bonus"

	if paladin.HasAura(bonusLabel) {
		return
	}

	core.MakePermanent(paladin.RegisterAura(core.Aura{
		Label: bonusLabel,
	}))
}
