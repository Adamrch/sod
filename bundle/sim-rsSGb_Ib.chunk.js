import{a3 as e,m as t,k as a,o as s,q as l,y as n}from"./preset_utils-BW2VStUK.chunk.js";import{G as o,o as p,U as i,a8 as r,aG as c,aa as d,ae as S,af as m,ak as f,a6 as u,al as I,ao as h,ap as g,an as w,S as P,ar as y,C as O,F as k,R as C}from"./detailed_results-DmSmD6mJ.chunk.js";const v=e({fieldName:"powerInfusionTarget",actionId:()=>o.fromSpellId(10060),extraCssClasses:["within-raid-sim-hide"],getValue:e=>e.getSpecOptions().powerInfusionTarget?.type==p.Player,setValue:(e,t,a)=>{const s=t.getSpecOptions();s.powerInfusionTarget=i.create({type:a?p.Player:p.Unknown,index:0}),t.setSpecOptions(e,s)}}),T=e({fieldName:"useInnerFire",actionId:()=>o.fromSpellId(48168)}),H=e({fieldName:"useShadowfiend",actionId:()=>o.fromSpellId(34433)}),U={type:"TypeAPL",priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48066}}},rhs:{const:{val:"18"}}}},multishield:{spellId:{spellId:48066},maxShields:10,maxOverlap:{const:{val:"0ms"}}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:53007}}},rhs:{const:{val:"4"}}}},castSpell:{spellId:{spellId:53007}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48113}}},rhs:{const:{val:"2"}}}},castSpell:{spellId:{spellId:48113}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48063}}},rhs:{const:{val:"1"}}}},castSpell:{spellId:{spellId:48063}}}}]},L={type:"TypeAPL",priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48063}}},rhs:{const:{val:"10"}}}},castSpell:{spellId:{spellId:48063}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48089}}},rhs:{const:{val:"5"}}}},castSpell:{spellId:{spellId:48089}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48068}}},rhs:{const:{val:"10"}}}},multidot:{spellId:{spellId:48068},maxDots:10,maxOverlap:{const:{val:"0ms"}}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{spellCpm:{spellId:{spellId:48113}}},rhs:{const:{val:"2"}}}},castSpell:{spellId:{spellId:48113}}}}]},R={items:[]},x=t("Blank",R,{talentTree:0}),D=t("Blank",R,{talentTree:1}),b=a("Disc",U),B=a("Holy",L),F={name:"Disc",data:r.create({talentsString:"0503203130300512301313231251-2351010303"})},A={name:"Holy",data:r.create({talentsString:"05032031103-234051032002152530004311051"})},M=c.create({useInnerFire:!0,useShadowfiend:!0,rapturesPerMinute:5,powerInfusionTarget:i.create()}),E=d.create({flask:S.FlaskUnknown,food:m.FoodUnknown}),N=f.create({giftOfTheWild:u.TristateEffectImproved,powerWordFortitude:u.TristateEffectImproved,strengthOfEarthTotem:u.TristateEffectRegular,arcaneBrilliance:!0,divineSpirit:!0,moonkinAura:!0}),G=I.create({blessingOfKings:!0,blessingOfWisdom:u.TristateEffectImproved}),W=h.create({}),j=s(P.SpecHealingPriest,{cssClass:"healing-priest-sim-ui",cssScheme:"priest",knownIssues:['Talents that apply to, "friendly targets at or below 50% health" are not implemented.',"Prayer of Mending always bounces the maximum number of times."],epStats:[g.StatIntellect,g.StatSpirit,g.StatSpellPower,g.StatSpellCrit,g.StatSpellHaste,g.StatMP5],epReferenceStat:g.StatSpellPower,displayStats:[g.StatMana,g.StatStamina,g.StatIntellect,g.StatSpirit,g.StatSpellPower,g.StatSpellCrit,g.StatSpellHaste,g.StatMP5],displayPseudoStats:[],defaults:{gear:x.gear,epWeights:l.fromMap({[g.StatIntellect]:2.73,[g.StatSpirit]:1.63,[g.StatSpellPower]:1,[g.StatSpellCrit]:.75,[g.StatSpellHaste]:.28,[g.StatMP5]:2.05}),consumes:E,talents:F.data,specOptions:M,raidBuffs:N,partyBuffs:w.create({}),individualBuffs:G,debuffs:W},playerIconInputs:[v,T,H],includeBuffDebuffInputs:[],excludeBuffDebuffInputs:[],otherInputs:{inputs:[]},encounterPicker:{showExecuteProportion:!1},presets:{talents:[F,A],rotations:[b,B],gear:[x,D]},autoRotation:e=>0==e.getTalentTree()?b.rotation.rotation:B.rotation.rotation,raidSimPresets:[{spec:P.SpecHealingPriest,tooltip:"Discipline Priest",defaultName:"Discipline",iconUrl:y(O.ClassPriest,0),talents:F.data,specOptions:M,consumes:E,defaultFactionRaces:{[k.Unknown]:C.RaceUnknown,[k.Alliance]:C.RaceDwarf,[k.Horde]:C.RaceUndead},defaultGear:{[k.Unknown]:{},[k.Alliance]:{1:x.gear},[k.Horde]:{1:x.gear}}},{spec:P.SpecHealingPriest,tooltip:"Holy Priest",defaultName:"Holy",iconUrl:y(O.ClassPriest,1),talents:A.data,specOptions:M,consumes:E,defaultFactionRaces:{[k.Unknown]:C.RaceUnknown,[k.Alliance]:C.RaceDwarf,[k.Horde]:C.RaceUndead},defaultGear:{[k.Unknown]:{},[k.Alliance]:{1:D.gear},[k.Horde]:{1:D.gear}}}]});class q extends n{constructor(e,t){super(e,t,j)}}export{q as H};