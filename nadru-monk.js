_ = require('underscore')._;

lvl = 9;
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
basehp = mod(basestats.con) * 9 + 8 + 3 + 3 + 7 + 4 + 5 + 4 + 7 + 6;

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

// druid
skillbase.concentration += 8;
skillbase.listen += 8;
skillbase.spot += 8;
skillbase.survival += 8;
skillbase.knownature += 8;
skillbase.survival += 4; skillbase.knownature += 4;

skillbase.wildempathy = lvl;

skillability = {
    concentration: "con",
    diplomacy: "cha",
    hide: "dex",
    movesilent: "dex",
    tumble: "dex",
    sensemotives: "wis",
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
"Leadership": "attract cohort and followers"}
class = {
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
"wild shape": "3 times per day 8hrs, small, medium, large",
}

spells = {
"todo": "todo"
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
	reflex: mod(stats.dex) +2+ 2,
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
    console.log("attack: +", bab + mod(stats.str));
    console.log("grapple: ", bab + mod(stats.str) + 4*size + 4 /*improved grapple */);
    console.log("dambonus:", mod(stats.str));
    console.log("specials:" , specials);
}

console.log("Human");
print();
console.log("hp:", basehp);
console.log("feats:", feats);
console.log("class:", class);
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

