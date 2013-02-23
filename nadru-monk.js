lvl = 11;
bab = 7
basestats = {
    str: 10,
    dex: 11,
    con: 16,
    wis: 17,
    'int': 13,
   cha: 13
}
specials = [
    "unarmed monk: +0 1d6"
];

// aging p.109 - Middle age
/*
basestats.str--; 
basestats.dex--; 
basestats.con--; 
basestats.int++; 
basestats.wis++; 
basestats.cha++;
*/

stats = Object.create(basestats);
// ability increase at lvl 4 and lvl 8
stats.wis++;
stats.wis++;

// find ability modifier
function mod(stat) { return Math.floor((stat-10)/2); }

// # Hit points
basehp = mod(basestats.con) * 9 + 8 + 3 + 3 + 7 + 4 + 5 + 4 + 7 + 6 + 6;

// Saves:

// # Skills
// 
skillbase = {};

// 4(druid/monk) + 1(int) + 1(human) lvl 1-9 druid
//Concentration (Con), Craft (Int), Diplomacy (Cha), Handle Animal (Cha), Heal (Wis), Knowledge (nature) (Int), Listen (Wis), Profession (Wis), Ride (Dex), Spellcraft (Int), Spot (Wis), Survival (Wis), Swim (Str). 

// monk
skillbase.concentration = 4;
skillbase.listen = 4;
skillbase.spot = 4;
skillbase.movesilent = 4;
skillbase.hide = 4;
skillbase.tumble = 4;

skillbase.survival = 0;
skillbase.knownature = 0;
skillbase.profession_herbalist_poisonmaking = 0;

// druid
skillbase.concentration += 9;
skillbase.listen += 9;
skillbase.spot += 9;
skillbase.survival += 9;
skillbase.knownature += 9;
skillbase.survival += 4; skillbase.knownature += 4; skillbase.profession_herbalist_poisonmaking += 1;

skillbase.wildempathy = lvl;

skillability = {
    concentration: "con",
    diplomacy: "cha",
    hide: "dex",
    movesilent: "dex",
    tumble: "dex",
    sensemotives: "wis",
    profession_herbalist_poisonmaking: "wis",
    listen: "wis",
    spot: "wis",
    survival: "wis",
    knownature: "int",
    handleanimal: "cha",
    wildempathy: "cha"
};

function skills() {
    var skill;
    var result = {};
    for(skill in skillbase) {
        result[skill] = skillbase[skill] + mod(stats[skillability[skill]]);
    }

    // synergy
	//result.wildempathy += 2; // handle animal
	result.survival += 2; // knowledge nature
	result.knownature += 2; // druid
	result.survival += 2; // druid
    result.hide -= 4*size;
    return result;
}

// feats and flaws
feats = {
// human
"Spell Focus Conjuration": "+1 difficulty class",
// lvl0
"improved initiative": "initiative +4",
// lvl3
"Augment Summoning": "+4con +4str to summons",
// lvl6
"Natural spell": "casting in wild shape",
// lvl9
"offset material": "",
//"Leadership": "attract cohort and followers"}
}
classes = {
// monk
"flurry of blows" : "-2/-2 attack instead of +0",
"improved grapple" : "no attck of opportunity when starting a grapple; +4 grapple bonus",
"unarmed strike" : "1d6 unarmed attack lethal or nonlethal",
"ac bonus" : "wis to ac when unarmored and unencumbered",
// druid
"animal companion": "gain animal after 24hr ritual",
"nature sense": "+2 knownature and survival",
"wild empathy": "animal diplomacy",
"woodland stride": "normal speed in undergrowth",
"trackless step": "untrackable",
"resist natures lure ": "+4 save vs. fey spell-like ability",
"wild shape": "3 times per day 8hrs, small, medium, large. heal like a days rest when shifting",
"venom immunity": "Immune to all poison"
}

spelllist = [
"0 Light: Object shines like a torch.",
"0 Light: Object shines like a torch.",
"0 Light: Object shines like a torch.",
"0 Detect Poison: Detects poison in one creature or object.",
"0 Detect Poison: Detects poison in one creature or object.",
"0 Detect Poison: Detects poison in one creature or object.",

"1 Obscuring Mist: Fog surrounds you.",
"1 Endure Elements: Exist comfortably in hot or cold environments.",
"1 Speak with Animals: You can communicate with animals.",
"1 Faerie Fire: Outlines subjects with light, canceling blur, concealment, and the like.",
"1 Faerie Fire: Outlines subjects with light, canceling blur, concealment, and the like.",

"2 Barkskin: Grants +1 (+1/3lvl, max +5 total) (+4) enhancement to natural armor. 10 min/lvl",
"2 Barkskin: Grants +1 (+1/3lvl, max +5 total) (+4) enhancement to natural armor. 10 min/lvl",
"2 Barkskin: Grants +1 (+1/3lvl, max +5 total) (+4) enhancement to natural armor. 10 min/lvl",
"2 Bull's Strength: Subject gains +4 to Str for 1 min./level.",
"2 Tree Shape: You look exactly like a tree for 1 hour/level.",

"3 Magic Fang, Greater: One natural weapon of subject creature gets +1/four levels on attack and damage rolls (max +5) or +1 to all. 1hr/lvl ",
"3 Magic Fang, Greater: One natural weapon of subject creature gets +1/four levels on attack and damage rolls (max +5) or +1 to all. 1hr/lvl ",
"3 Cure Moderate Wounds: Cures 2d8 damage +1/level (max +10).",
"3 Call Lightning: Calls down lightning bolts (3d6 per bolt) from sky 9 bolts within 9min.",

"4 Flame Strike: Smite foes with Divine fire (1d6/level damage).",
"4 Flame Strike: Smite foes with Divine fire (1d6/level damage).",
"4 Flame Strike: Smite foes with Divine fire (1d6/level damage).",

"5 Wall of Thorns: Thorns damage anyone who tries to pass. ",
];

"0th Level",
"",
"1st Level",
"2nd Level",

spells = { //{{{1
"0 x 6": //{{{2
[
"Create Water: Creates 2 gallons/level of pure water.",
"Detect Magic: Detects spells and magic items within 60 ft.",
"Cure Minor Wounds: Cures 1 point of damage.",
"Guidance: +1 on one attack roll, saving throw, or skill check.",
"Light: Object shines like a torch.",
"Mending: Makes minor repairs on an object.",
"",
"Detect Poison: Detects poison in one creature or object.",
"Flare: Dazzles one creature (–1 penalty on attack rolls).",
"Know Direction: You discern north.",
"Purify Food and Drink: Purifies 1 cu. ft./level of food or water.",
"Read Magic: Read scrolls and spellbooks.",
"Resistance: Subject gains +1 bonus on saving throws.",
"Virtue: Subject gains 1 temporary hp.",
],
"1 x 4+1": //{{{2
[
"Pass without Trace: One subject/level leaves no tracks.",
"Endure Elements: Exist comfortably in hot or cold environments.",
"Entangle: Plants entangle everyone in 40-ft.-radius.",
"Obscuring Mist: Fog surrounds you.",
"Speak with Animals: You can communicate with animals.",
"Faerie Fire: Outlines subjects with light, canceling blur, concealment, and the like.",
"",
"Aspect of the WolfSC: This is a fairly handy melee self-buff for early levels (instead of going the wooden club route with Shillelagh). At later levels, you can share it with your Animal Companion to help deal with the practical issues of traveling with a snarling bear the size of a bull elephant.",
"Babau SlimeSC: Great for grappling druids, and a general-purpose damage buff for any Wild Shaping Druid.",
"Beget BogunSC: Creates a small little creature to do your chores.",
"CamouflageSC: +10 to Hide, and it works in any environment.",
"Enrage AnimalSC: A solid buff for your animal companion, enabling it to rage like a barbarian without the fatigue.",
"Lessor VigorSC: This spell actually outperforms Cure Light Wounds, especially out of combat. Wands of Lesser Vigor are great for healing between fights.",
"Omen of PerilSC: Poor man's Augury. Quite possibly the most versatile first-level divination in the game, and doesn't even have a costly component or XP cost, like many similar divinations.",
"Spider HandBoVD: Best. Scouting. Spell. Ever. Send out a nondescript spider to do all the scouting, with only negligible consequences if it dies? Yeah, I'll take that. It's not even an evil spell.",
"ThunderheadSC: 1d6 damage per round/level unless they make a reflex to negate, and also acts as a tracker against targets who turn invisible",
"Twilight LuckBoED: +1 on saves is always handy, especially at higher levels. Just lay off the booze.",
"Wood WoseSC: Unseen Servant, only druidic. It just can't handle doorknobs.",
"",
"Cure Light Wounds: Cures 1d8 damage +1/level (max +5).",
"Produce Flame: 1d6 damage +1/level, touch or thrown.",
"Charm Animal: Makes one animal your friend.",
"Calm Animals: Calms (2d4 + level) HD of animals.",
"Detect Animals or Plants: Detects kinds of animals or plants.",
"Detect Snares and Pits: Reveals natural or primitive traps.",
"Goodberry: 2d4 berries each cure 1 hp (max 8 hp/24 hours).",
"Hide from Animals: Animals can’t perceive one subject/level.",
"Jump: Subject gets bonus on Jump checks.",
"Longstrider: Your speed increases by 10 ft.",
"Magic Fang: One natural weapon of subject creature gets +1 on attack and damage rolls.",
"Magic Stone: Three stones gain +1 on attack rolls, deal 1d6+1 damage.",
"Shillelagh: Cudgel or quarterstaff becomes +1 weapon (1d10 damage) for 1 min./level.",
"Summon Nature's Ally I: Calls creature to fight.",
],
"2 x 4+1": //{{{2
[
"Barkskin: Grants +1 (+1/3lvl, max +5 total) (+4) enhancement to natural armor. 10 min/lvl",
"Bear's Endurance: Subject gains +4 to Con for 1 min./level.",
"Gust of Wind: Blows away or knocks down smaller creatures.",
"Wood Shape: Rearranges wooden objects to suit you.",
"Blinding SpittleSC: . Blindness with no save, with a ranged touch attack at+4.",
"",
"Align FangSC: Handy for DR problems.",
"Animalistic PowerPHB2: Versatility over the animal stat buffs, traded for half the power. It's a style thing; either way is good.",
"Bite of the WereratSC: A variety of handy stat buffs, plus an additional bite attack for forms that don't have a natural bite.",
"Blood SnowFrost: Only prep it during the winter or when in an arctic or otherwise frozen area, but d2 Con damage/round is awesome.",
"BramblesSC: Excellent weapon buff, especially coupled with Shillelagh.",
"Briar WebSC: A handy entangling spell that may also cause damage.",
"Creeping ColdSC: A great attack spell, and replaces produce flame.",
"DesiccateSand: d6/level (max 5d6) on a single target, with a weird damage type that ignores DR and energy resistance. Can even cause dehydration (which is fatigue on steroids).",
"EarthbindSC: Ground those fliers.",
"Halo of SandSand: Yet another druid AC buff. This one is deflection, though, so it stacks with Barkskin and armor.",
"Nature's FavorSC: Excellent (swift!) animal buff spell; cast it on your Animal Companion or summons. Technically better than Greater Magic Fang, but has a shorter duration and doesn't bypass DR. The Complete Divine version is even stronger, but the spell was nerfed in Complete Adventurer.",
"Share HuskSC: A great scouting spell. Use it if Spider Hand isn't available.",
"Snake's Swiftness, MassSC: The lower-level, single-target version of this spell isn't anything special, but giving a free attack to all of your party members, plus your animal companion, plus any summons you have nearby is just too fun.",
"SplinterboltSC: its the druidic scorching ray, but with no SR (and coupled with a nice high dex animal form, (e.g., Legendary eagle) its nearly as easy to hit with). 4d6 x3 with a 18-20 threat range isn't half bad. ",
"",
"Bull's Strength: Subject gains +4 to Str for 1 min./level.",
"Resist Energy: Ignores 10 (or more) points of damage/attack from specified energy type.",
"Animal Messenger: Sends a Tiny animal to a specific place.",
"Animal Trance: Fascinates 2d6 HD of animals.",
"Cat's Grace: Subject gains +4 to Dex for 1 min./level.",
"Chill Metal: Cold metal damages those who touch it.",
"Delay Poison: Stops poison from harming subject for 1 hour/level.",
"Fire TrapM: Opened object deals 1d4 +1/level damage.",
"Flame Blade: Touch attack deals 1d8 +1/two levels damage.",
"Flaming Sphere: Creates rolling ball of fire, 2d6 damage, lasts 1 round/level.",
"Fog Cloud: Fog obscures vision.",
"Heat Metal: Make metal so hot it damages those who touch it.",
"Hold Animal: Paralyzes one animal for 1 round/level.",
"Owl's Wisdom: Subject gains +4 to Wis for 1 min./level.",
"Reduce Animal: Shrinks one willing animal.",
"Restoration, Lesser: Dispels magical ability penalty or repairs 1d4 ability damage.",
"Soften Earth and Stone: Turns stone to clay or dirt to sand or mud.",
"Spider Climb: Grants ability to walk on walls and ceilings.",
"Summon Nature's Ally II: Calls creature to fight.",
"Summon Swarm: Summons swarm of bats, rats, or spiders.",
"Tree Shape: You look exactly like a tree for 1 hour/level.",
"Warp Wood: Bends wood (shaft, handle, door, plank).",
],
"3 x 3+1": //{{{2
[
"Plant Growth: Grows vegetation, improves crops.",
"Magic Fang, Greater: One natural weapon of subject creature gets +1/four levels on attack and damage rolls (max +5) or +1 to all. 1hr/lvl ",
"Stone Shape: Sculpts stone into any shape.",
"Call Lightning: Calls down lightning bolts (3d6 per bolt) from sky 9 bolts within 9min.",
"Alter FortunePHB2: Fantastic spell. Great for emergencies (reroll a save!)",
"BlindsightSC: 30' Blindsight. Who needs See Invisibility?",
"Girallon's BlessingSC: This spell gives the creature touched an extra set of arms for 10/minutes per level, which can be quite handy if your wildshape form could use some arms to manipulate objects.  There are probably better ways to mete out damage, but solid choice if you think your shark form may need to open a door, chest, etc.",
"",
"Arctic HazeFrost) and HaboobSand: Damaging and opaque fog. Useful as battlefield control. TremorSC: can be used similarly, but it doesn't damage and doesn't block line of sight.",
"Attune FormSC: Immunity from planar effects for caster level/3 characters. A handy spell for high levels, and much more useful than the lower-level Avoid Planar EffectsSC: due to the longer duration.",
"Bite of the WerewolfSC: Again, a variety of nifty stat buffs and a spare bite attack.",
"CrumbleSC: Think of this as druidic Knock. Lots of things won't stand up to a casting of this spell.",
"Entanging StaffSC: Free action grapples with a +8 bonus. Great for when you're out of Wild Shape for some reason or if you're using a Spikes-enspelled staff as a Legendary Ape.",
"Evard's Menacing TentaclesPHB2: To the extent that you have a good strength bonus, this spell provides some battlefield control and meets out some damage and gives a climbing bonus to boot",
"ForestfoldSC: +10 on Hide and Move Silently checks in a natural environment of your choice.",
"Giant's WrathSC: An interesting alternative to Call Lightning. At early levels, the lack of a need for an attack roll, the lack of DR issues, and the greater number of uses per cast makes Call Lightning the better choice. At higher levels, though, the high strength of Wild Shape forms, the caster-level based damage bonus, and the lack of SR on Giant's Wrath helps it catch up.",
"Greater Magic Fang: Handy self-buff and good to share with your Animal Companion.",
"Junglerazor[sup]SC: Does 1d10/level (up to 10) in a 120ft line. Because it's target specific, shoot through your friends to damage only plants, plant critters, vermin, fey and animals.",
"Poison: Con damage is always handy, and the DC scales upward as you increase in level. A much-overlooked spell.",
"Primal FormSC: This spell isn't overwhelmingly powerful, but it's a versatile self-buff. Flight and swim speed are easy to get with Wild Shape, but this spell is available before plentiful Wild Shape uses, and you can choose on the fly among a melee buff, a defensive buff, or a source of flight.",
"Protection From Energy: A versatile, effective defensive buff. You'll rarely regret prepping it.",
"Remove Disease: Not something you're going to prep every day, but handy when you need it.",
"SpiderskinSC: Barkskin, plus a save bonus against poison and a Hide bonus. Use it on the party sneak, or when you're fighting monstrous vermin or Yuan-Ti.",
"SpikesSC: Improved Brambles. Higher attack, better threat level; what's not to like?",
"SpritjawsSC: I love this spell, and it's one of a druid's few good force spells. Throw this spell out there and it's a combination of Spiritual Weapon and Telekinetic Grapple. It damages and confounds enemies, doing an especially good job of pinning down spellcasters and incorporeal foes.",
"Swift Lion's ChargeMiniHB/Lion's ChargeSC: Pouncing is very handy, but this spell can start to eat up spell slots pretty quickly. A similar, overpowered spell named Lion's Charge is in Savage Species, and, while it isn't swift, it gives the Pounce ability for a duration.",
"ThornskinSC: Good as a wildshape buff, especially for grapplers, since even trying to escape hurts your enemy.",
"VenomfireSK: For level/hours, +d6/level damage with no cap added as an additional effect to a poisonous natural attack.",
"Vigor and Mass Lesser VigorSC: Both can be better than Cure Moderate Wounds at low levels, but only outside of combat. It works when you can't summon Unicorns yet and you don't have that handy wand of Cure Light Wounds. Doesn't work with Extend Spell (see CD FAQ), but Mass Lesser Vigor does work with Persistent Spell.",
"",
"Snare: Creates a magic booby trap.",
"Wind Wall: Deflects arrows, smaller creatures, and gases.",
"Cure Moderate Wounds: Cures 2d8 damage +1/level (max +10).",
"Sleet Storm: Hampers vision and movement.",
"Poison: Touch deals 1d10 Con damage, repeats in 1 min.",
"Protection from Energy: Absorb 12 points/level of damage from one kind of energy.",
"Contagion: Infects subject with chosen disease.",
"Daylight: 60-ft. radius of bright light.",
"Diminish Plants: Reduces size or blights growth of normal plants.",
"Dominate Animal: Subject animal obeys silent mental commands.",
"Meld into Stone: You and your gear merge with stone.",
"Neutralize Poison: Immunizes subject against poison, detoxifies venom in or on subject.",
"Quench: Extinguishes nonmagical fires or one magic item.",
"Remove Disease: Cures all diseases affecting subject.",
"Speak with Plants: You can talk to normal plants and plant creatures.",
"Spike Growth: Creatures in area take 1d4 damage, may be slowed.",
"Summon Nature's Ally III: Calls creature to fight.",
"Water Breathing: Subjects can breathe underwater.",
],
"4 x 2+1": //{{{2
[
"ScryingF: Spies on subject from a distance.",
"Flame Strike: Smite foes with Divine fire (1d6/level damage).",
"Freedom of Movement: Subject moves normally despite impediments.",
"Enhance Wild ShapeSC: You can pick up plant forms early or get minor stat buffs, but the big bonus is the access to extraordinary abilities. Pick up the Blindsight of a Desmodu War BatMM2, or abuse Master of Many FormsCAdv.",
"Superior Magic FangSC: GMF on all of your attacks. It's self-only, though.",
"",
"Arc of LightningSC: A decent no-SR spell, with damage competitive with that of a wizard or psion. It's a conjuration spell, so, that Spell Focus: Conjuration feat you had to pick for Augment Summoning might be useful.",
"Aspect of the WerebeastRoE: Nothing about this Shifter-only self-buff says it only works when you're in a humanoid form. Add +4 to two different attributes, and add Improved Grab, Pounce, or wolf-like Trip to whatever form you're in.",
"Bite of the WereboarSC: Useful stat buffs, a spare bite attack, and one of the better AC buffs around.",
"Blast of SandSand: Cone of Cold lite (cone, d6/level, max 10d6), only without the energy type. No SR!",
"Boreal WindFrost: Does decent cold damage, has a fairly big AoE, blows enemies away, disperses fogs and swarms, and keeps going for multiple turns without concentration. Compares favorably even to Flame Strike.",
"Claws of the SavageBoVD: Got claws? This gives you a +2 enhancement bonus on them, and also gives increases your claw damage as if you were two sizes larger. It is an Evil-typed spell, though.",
"Giant Vermin",
"Hibernal HealingFrost: Self-only Heal...as long as you're in a frostfell area, anyway.",
"Last BreathSC: In Complete Divine, this is druidic Revivify, but with a caster-damaging side effect. In Spell Compendium, this is a no-level-loss Reincarnate that must be cast immediately. Both are useful as an emergency option.",
"Sheltered VitalitySC: Immunity to ability damage or drain is situational, but very powerful when you need it. Cast this before fighting yuan-ti, giant vermin, undead, or anything else with a nasty ability damage or poison attack. The immunity to fatigue can also be handy for the party barbarian.",
"Vortex of TeethSC: A spell that does force damage, and can tear apart anything that can'tget away. This makes a mess of anyone caught in Entangle.",
"Wall of SaltSand: Not quite Wall of Stone, but effective for battlefield control and deterring pursuit.",
"Wind at BackSC: It lets you double the party's overland speed, lasts 12 hours and can let you speed up multiple beasts of burden, as well.",
"Air Walk: Subject treads on air as if solid (climb at 45-degree angle).",
"Antiplant Shell: Keeps animated plants at bay.",
"Blight: Withers one plant or deals 1d6/level damage to plant creature.",
"Command Plants: Sway the actions of one or more plant creatures.",
"Control Water: Raises or lowers bodies of water.",
"Cure Serious Wounds: Cures 3d8 damage +1/level (max +15).",
"Dispel Magic: Cancels spells and magical effects.",
"Giant Vermin: Turns centipedes, scorpions, or spiders into giant vermin.",
"Ice Storm: Hail deals 5d6 damage in cylinder 40 ft. across.",
"Reincarnate: Brings dead subject back in a random body.",
"Repel Vermin: Insects, spiders, and other vermin stay 10 ft. away.",
"Rusting Grasp: Your touch corrodes iron and alloys.",
"Spike Stones: Creatures in area take 1d8 damage, may be slowed.",
"Summon Nature's Ally IV: Calls creature to fight.",
],
"5 x 1+0": //{{{2
[
"Wall of Thorns: Thorns damage anyone who tries to pass. ",
"Animal Growth: One animal/two levels doubles in size.",
"Baleful Polymorph: Transforms subject into harmless animal.",
"Call Lightning Storm: As call lightning, but 5d6 damage per bolt.",
"Commune with Nature: Learn about terrain for 1 mile/level.",
"Tree Stride: Step from one tree to another far away.",
"Bite of the WeretigerSC: A very high str boost, a variety of other boosts, extra attacks, and free Power Attack.",
"",
"Control Winds: Change wind direction and speed.",
"Owl's InsightSC: A long-duration scaling boost to Wisdom with an unusual bonus type? Yes please.",
"PancaeaSC: A broad-based restoration spell, removing pretty much any condition other than ability damage/drain, disease, or death.",
"Phantom StagSC: Conjure a very fast mount that it gains a lot of useful additional effects based on caster-level, so that even though its only level 5 its well, it's worth preparing at higher level still, since it, for example, can make you ethereal (as the 9th level cleric sor/wiz spell).",
"Rejuvenation CoccoonSC: A decent out-of-combat Heal alternative.",
"Choking SandsSand: Miasma, only less so. Alternately, nonpsionic Crisis of Breath. Good for shutting down a caster for a turn.",
"Cloak of the SeaSC: When you're underwater, it's Water Breathing, Freedom of Movement, and Blur, all in one neat little (long-duration!) package. A must-have for any underwater adventures.",
"BlizzardFrost: Instant battle ender. Great for buying some time to parley or obscuring your plans. Huge area of effect.",
"Call AvalancheFrost While it doesn't cause overwhelming damage (only 8d6), it can bury many opponents in its huge area (size of creatures you can bury scales up as well). It only works outdoors, but it does damage and potential immobilization at long range. For a good trick trick, follow it up with Blood Snow and all the poor buried victims start taking CON drain while trying futilely to escape.",
"Anticold SphereSC: Immunity to cold and great protection from anything with the Cold subtype, with a nice long duration and an area large enough to protect the whole party.",
"Atonement: Removes burden of misdeeds from subject.",
"AwakenX: Animal or tree gains human intellect.",
"Cure Critical Wounds: Cures 4d8 damage +1/level (max +20).",
"Death Ward: Grants immunity to all death spells and negative energy effects.",
"HallowM: Designates location as holy.",
"Insect Plague: Locust swarms attack creatures.",
"StoneskinM: Ignore 10 points of damage per attack.",
"Summon Nature's Ally V: Calls creature to fight.",
"Transmute Mud to Rock: Transforms two 10-ft. cubes per level.",
"Transmute Rock to Mud: Transforms two 10-ft. cubes per level.",
"UnhallowM: Designates location as unholy.",
"Wall of Fire: Deals 2d4 fire damage out to 10 ft. and 1d4 out to 20 ft. Passing through wall deals 2d6 damage +1/level.",
],
"6 x 0+0": //{{{2
[
"Antilife Shell: Exceedingly powerful defensive spell. Anything living without SR just can't touch you.",
"Enveloping CocoonSC: This will let you turn the save of any number of nasty spells (Miasma and Baleful Polymorph being the nastiest) into a Reflex save, essentially, or just tie up one enemy that doesn't have a light/natural weapon handy (including incorporeal foes).",
"Find the Path: Never, ever, EVER be lost.",
"Fire Seeds: Excellent trap spell when used to make holly berry bombs. Couple it with some sort of fire resistance or immunity and you have a killer emanation-from-yourself nuke.",
"MummifySand: Save or die. Plus, it's not death magic.",
"Spellstaff: One extra spell slot, of whatever level you can cast. Clerics with Miracle have no reason not to duplicate this very handy spell.",
"Superior ResistanceSC: +6 on all saves, all day. Its utility is obvious. (Spell Compendium upped the level, but also the duration. It's still worth it, unlike the pounding Major Resistance took.)",
"",
"Bite of the WerebearSC: Bite of the Weretiger only moreso.",
"Chasing PerfectionPHB2: Handy as a self-buff, since it's hard to use magic items in Wild Shape. Won't be terribly useful to the rest of the party at level 13, though.",
"DrownSC: Save or dying (0 hp). Handy for capturing enemies alive. Not death magic, but obviously doesn't work on non-living creatures, water-breathers, or creatures with no lungs. This has replaced the repeatedly-nerfed MiasmaSC.",
"Energy ImmunitySC: Powerful, of a bit situational, defensive buff. Has a long enough duration to have it on all the time.",
"Fires of PuritySC: A hefty melee damage buff, plus Flame Shield lite. Note that, while this spell is three levels higher than Venomfire and only adds one point per caster level instead of d6, it's still a good spell. That's how silly Venomfire is.",
"Tortoise ShellSC: Basically, Greater Barkskin. Not as good as Greater Luminous Armor, but is natural armor instead of armor.",
"Liveoak: Handy if you need a Treant to guard your camp or home. The casting time and casting limitations limit its general usefulness, though.",
"Greater Dispel Magic: Unlike mages and clerics, druids very rarely lose caster levels, so this is often a worthwhile spell to prep.",
"Greater Scrying: Scrying without the long casting time and relatively short duration; the minor spells you can cast through the sensor aren't that useful.",
],
}
//{{{1

// creature size
// small = -1, normal = 0, large = +1, ...
size = 0;
// natural armor
naturalac = 0;

// Armor class
// same touch and 
function ac() {
    var fullac = 10 + naturalac + mod(stats.dex) - size + /* monk */mod(stats.wis);
    return { touch: fullac - naturalac,
             flatfooted: fullac - mod(stats.dex),
             normal: fullac};
}

// saves
function saves() {
    return {
	fortitude: mod(stats.con) +2 + 7,
	reflex: mod(stats.dex) +2+ 3,
	will: mod(stats.wis) +2+ 7,
    }
}
// movement
move = "30ft";
function initiative() {
    return mod(stats.dex) + 4;
}

// print character 
function print() {
    for(stat in basestats) {
        console.log(stat, stats[stat], mod(stats[stat]));
    }
    console.log("move:", move);
    console.log("initiative: ", initiative());
    console.log("skills:", skills());
    console.log("saves:", saves());
    console.log("ac:", ac());
    console.log("attack: +", bab + mod(stats.str) - size);
    console.log("grapple: ", bab + mod(stats.str) + 4*size + 4 /*improved grapple */);
    console.log("dambonus:", mod(stats.str));
    console.log("specials:" , specials);
}

console.log("Human");
print();
console.log("hp:", basehp);
console.log("feats:", feats);
console.log("class:", classes);
console.log("spells:", spells);

// wild shapes

console.log("\n\ndire lion");
move = "40ft walk"
stats = Object.create(stats);
stats.str = 25;
stats.dex = 15;
stats.con = 17;
size = 1;
naturalac = 4;
specials = [
	"claw: +0 1d6",
	"claw: +0 1d6",
	"bite: -5 1d8",
    "Improved Grab (Ex): To use this ability, a dire lion must hit with its bite attack. It can then attempt to start a grapple as a free action without provoking an attack of opportunity. If it wins the grapple check, it establishes a hold and can rake.", 
    "Pounce (Ex): If a dire lion charges, it can make a full attack, including two rake specials.",
    "Rake (Ex): Attack bonus +12 melee, damage 1d6+3.",
    "Skills: Dire lions have a +4 racial bonus on Hide and Move Silently checks."
]
print();

console.log("\n\ndire wolf");
move = "50ft walk"
stats = Object.create(stats);
stats.str = 25;
stats.dex = 15;
stats.con = 17;
size = 1;
naturalac = 3;
specials = [
	"bite: 0 1d8",
    "Trip (Ex): A dire wolf that hits with a bite attack can attempt to trip its opponent (+11 check modifier) as a free action without making a touch attack or provoking an attack of opportunity. If the attempt fails, the opponent cannot react to trip the dire wolf.",
    "Skills: A dire wolf has a +2 racial bonus on Hide, Listen, Move Silently, and Spot checks. "
]
print();

console.log("\n\nbrown bear");
move = "40ft walk"
stats = Object.create(stats);
stats.str = 27;
stats.dex = 13;
stats.con = 19;
size = 1;
specials = "";
naturalac = 5;
specials = [
	"claw: +0 1d8",
	"claw: +0 1d8",
	"bite: -5 2d6",
    "Improved Grab (Ex): To use this ability, a brown bear must hit with a claw attack. It can then attempt to start a grapple as a free action without provoking an attack of opportunity.",
    "Skills: A brown bear has a +4 racial bonus on Swim checks. "
]
print();

console.log("\n\nrhinoceros");
move = "30ft walk"
stats = Object.create(stats);
stats.str = 26;
stats.dex = 10;
stats.con = 21;
size = 1;
naturalac = 7;
specials = [
	"gore: +0 2d6",
    "powerful charge (double dam)"
]
print();

console.log("\n\neagle");
move = "10ft walk / 80ft fly"
stats = Object.create(stats);
stats.str = 10;
stats.dex = 15;
stats.con = 12;
size = -1;
naturalac = 1;
specials = [
	"talon: +0 1d4",
	"talon: +0 1d4",
	"bite: -5 1d4",
    "Skills: Eagles have a +8 racial bonus on Spot checks. "
]
print();

console.log("\n\ndire bat");
move = "20ft walk / 40ft fly"
stats = Object.create(stats);
stats.str = 17;
stats.dex = 22;
stats.con = 17;
size = 1;
naturalac = 5;
specials = [
    "bite +0 1d8"
]
print();


console.log("\n\ndire hawk");
move = "10ft walk / 80ft fly"
stats = Object.create(stats);
stats.str = 12;
stats.dex = 22;
stats.con = 15;
size = 0;
naturalac = 3;
specials = [
	"claw: +0 1d4+1",
	"claw: +0 1d4+1",
	"bite: -5 1d6",
    "Skills: Dire hawk have a +8 racial bonus on Spot checks in daylight. "
]
print();

console.log("\n\nlarge viper");
move = "20ft walk/climb/swim"
stats = Object.create(stats);
stats.str = 10;
stats.dex = 17;
stats.con = 11;
size = 0;
naturalac = 3;
specials = [
	"bite: +0 1d4+poison",
    "poison: dc11fort 1d6/1d6 con"
]
print();
console.log(spelllist);

console.log("poison: dc15, 1d4 con");
