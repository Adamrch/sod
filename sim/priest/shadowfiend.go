package priest

import (
	"time"

	"github.com/wowsims/sod/sim/core"
)

func (priest *Priest) registerShadowfiendSpell() {
	actionID := core.ActionID{SpellID: 401977}
	duration := time.Second * 15
	cooldown := time.Minute * 5

	// For timeline only
	priest.ShadowfiendAura = priest.RegisterAura(core.Aura{
		ActionID: actionID,
		Label:    "Shadowfiend",
		Duration: duration,
	})

	priest.Shadowfiend = priest.RegisterSpell(core.SpellConfig{
		ActionID:    actionID,
		SpellSchool: core.SpellSchoolShadow,
		ProcMask:    core.ProcMaskEmpty,
		Flags:       SpellFlagPriest | core.SpellFlagAPL,

		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				GCD: core.GCDDefault,
			},
			CD: core.Cooldown{
				Timer:    priest.NewTimer(),
				Duration: cooldown,
			},
		},

		ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
			priest.ShadowfiendPet.EnableWithTimeout(sim, priest.ShadowfiendPet, duration)
			priest.ShadowfiendAura.Activate(sim)
		},
	})

	priest.AddMajorCooldown(core.MajorCooldown{
		Spell:    priest.Shadowfiend,
		Priority: 1,
		Type:     core.CooldownTypeMana,
		ShouldActivate: func(sim *core.Simulation, character *core.Character) bool {
			return character.CurrentManaPercent() <= 0.01
		},
	})
}
