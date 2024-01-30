package warrior

import (
	"time"

	"github.com/wowsims/sod/sim/core"
)

// TODO: Classic Update
func (warrior *Warrior) registerShieldSlamSpell() {
	warrior.ShieldSlam = warrior.RegisterSpell(core.SpellConfig{
		ActionID:    core.ActionID{SpellID: 47488},
		SpellSchool: core.SpellSchoolPhysical,
		ProcMask:    core.ProcMaskMeleeMHSpecial, // TODO: Is this right?
		Flags:       core.SpellFlagMeleeMetrics | core.SpellFlagIncludeTargetBonusDamage | core.SpellFlagAPL,

		RageCost: core.RageCostOptions{
			Cost:   20,
			Refund: 0.8,
		},
		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				GCD: core.GCDDefault,
			},
			IgnoreHaste: true,
			CD: core.Cooldown{
				Timer:    warrior.NewTimer(),
				Duration: time.Second * 6,
			},
		},
		ExtraCastCondition: func(sim *core.Simulation, target *core.Unit) bool {
			return warrior.PseudoStats.CanBlock
		},

		BonusCritRating: 5 * core.CritRatingPerCritChance,
		DamageMultiplier: 1,
		CritMultiplier:   warrior.critMultiplier(mh),
		ThreatMultiplier: 1.3,
		FlatThreatBonus:  770,

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {

			// TODO: Verify that this bypass behavior and DR curve are correct

			sbvMod := warrior.PseudoStats.BlockValueMultiplier
			sbvMod /= 1

			sbv := warrior.BlockValue() / sbvMod

			sbv = sbvMod * (core.TernaryFloat64(sbv <= 1960.0, sbv, 0.0) + core.TernaryFloat64(sbv > 1960.0 && sbv <= 3160.0, 0.09333333333*sbv+1777.06666667, 0.0) + core.TernaryFloat64(sbv > 3160.0, 2072.0, 0.0))

			baseDamage := sim.Roll(990, 1040) + sbv
			result := spell.CalcAndDealDamage(sim, target, baseDamage, spell.OutcomeMeleeSpecialHitAndCrit)

			if !result.Landed() {
				spell.IssueRefund(sim)
			}
		},
	})
}
