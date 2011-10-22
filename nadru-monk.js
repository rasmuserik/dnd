lvl = 10;
bab = 6
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

spells = {
"0 x 6": 
[
"Create Water: Creates 2 gallons/level of pure water.",
"Cure Minor Wounds: Cures 1 point of damage.",
"Detect Magic: Detects spells and magic items within 60 ft.",
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
"1 x 4+1": 
[
"Pass without Trace: One subject/level leaves no tracks.",
"Endure Elements: Exist comfortably in hot or cold environments.",
"Entangle: Plants entangle everyone in 40-ft.-radius.",
"Obscuring Mist: Fog surrounds you.",
"Speak with Animals: You can communicate with animals.",
"",
"Cure Light Wounds: Cures 1d8 damage +1/level (max +5).",
"Produce Flame: 1d6 damage +1/level, touch or thrown.",
"Faerie Fire: Outlines subjects with light, canceling blur, concealment, and the like.",
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
"2 x 4+1": 
[
"Barkskin: Grants +1 (+1/3lvl, max +5 total) (+4) enhancement to natural armor. 10 min/lvl",
"Bear's Endurance: Subject gains +4 to Con for 1 min./level.",
"Gust of Wind: Blows away or knocks down smaller creatures.",
"Wood Shape: Rearranges wooden objects to suit you.",
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
"3 x 3+1": 
[
"Plant Growth: Grows vegetation, improves crops.",
"Magic Fang, Greater: One natural weapon of subject creature gets +1/four levels on attack and damage rolls (max +5) or +1 to all. 1hr/lvl ",
"Stone Shape: Sculpts stone into any shape.",
"Call Lightning: Calls down lightning bolts (3d6 per bolt) from sky 9 bolts within 9min.",
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
"4 x 2+1": 
[
"ScryingF: Spies on subject from a distance.",
"Flame Strike: Smite foes with Divine fire (1d6/level damage).",
"Freedom of Movement: Subject moves normally despite impediments.",
"",
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
"5 x 1+0": 
[
"Wall of Thorns: Thorns damage anyone who tries to pass. ",
"Animal Growth: One animal/two levels doubles in size.",
"Baleful Polymorph: Transforms subject into harmless animal.",
"Call Lightning Storm: As call lightning, but 5d6 damage per bolt.",
"Control Winds: Change wind direction and speed.",
"Commune with Nature: Learn about terrain for 1 mile/level.",
"Tree Stride: Step from one tree to another far away.",
"",
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

}

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
	fortitude: mod(stats.con) +2 + 6,
	reflex: mod(stats.dex) +2+ 3,
	will: mod(stats.wis) +2+ 6,
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

