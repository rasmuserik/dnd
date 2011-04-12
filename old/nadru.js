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

// aging p.109 - Middle age
basestats.str--; 
basestats.dex--; 
basestats.con--; 
basestats.int++; 
basestats.wis++; 
basestats.cha++;

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

// 4(druid) + 2(int) + 1(human) lvl 1-9 druid
//Concentration (Con), Craft (Int), Diplomacy (Cha), Handle Animal (Cha), Heal (Wis), Knowledge (nature) (Int), Listen (Wis), Profession (Wis), Ride (Dex), Spellcraft (Int), Spot (Wis), Survival (Wis), Swim (Str). 

skillbase.concentration = lvl + 3;
skillbase.handleanimal = lvl + 3;
skillbase.listen = lvl + 3;
skillbase.spot = lvl + 3;
skillbase.survival = lvl + 3;
skillbase.knownature = lvl + 3;

skillbase.wildempathy = lvl;

skillability = {
    concentration: "con",
    diplomacy: "cha",
    hide: "dex",
    movesilent: "dex",
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
	result.wildempathy += 2; // handle animal
	result.survival += 2; // knowledge nature
    return result;
}

// feats and flaws
feats = {
// human
"Spell Focus Conjuration": "+1 difficulty class",
// lvl0
"Augment Summoning": "+4con +4str to summons",
// lvl3
"improved initiative": "initiative +4",
// lvl6
"Natural spell": "casting in wild shape",
// lvl9
"Leadership": "attract cohort and followers"}

// creature size
// small = -1, normal = 0, large = +1, ...
size = 0;
// natural armor
naturalac = 0;

// Armor class
// same touch and 
function ac() {
    var fullac = 10 + naturalac + mod(stats.dex) - size;
    return { touch: fullac - naturalac,
             flatfooted: fullac - mod(stats.dex),
             normal: fullac};
}

// saves
function saves() {
    return {
	fortitude: mod(stats.con) + 6,
	reflex: mod(stats.dex) + 3,
	will: mod(stats.wis) + 6,
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
    console.log("grapple: ", bab + mod(stats.str) + 4*size);
    console.log("dambonus:", mod(stats.str));
}

console.log("Human");
print();
console.log("hp:", basehp);
console.log("feats:", feats);

// wild shapes

console.log("\n\ndire lion");
move = "40ft walk"
stats = Object.create(stats);
stats.str = 25;
stats.dex = 15;
stats.con = 17;
size = 1;
naturalac = 4;
attacks = [
	"claw: +13 melee (1d6+7)",
	"claw: +13 melee (1d6+7)",
	"bite: +7 melee (1d8+3)",
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
attacks = [
	"bite: +11 melee (1d8+10) w/trip",
]
print();

console.log("\n\nbrown bear");
move = "40ft walk"
stats = Object.create(stats);
stats.str = 27;
stats.dex = 13;
stats.con = 19;
size = 1;
attacks = "";
naturalac = 5;
print();

console.log("\n\nrhinoceros");
move = "30ft walk"
stats = Object.create(stats);
stats.str = 26;
stats.dex = 10;
stats.con = 21;
size = 1;
naturalac = 7;
print();

console.log("\n\neagle");
move = "10ft walk / 80ft fly"
stats = Object.create(stats);
stats.str = 10;
stats.dex = 15;
stats.con = 12;
size = -1;
naturalac = 1;
print();

console.log("\n\ndire bat");
move = "20ft walk / 40ft fly"
stats = Object.create(stats);
stats.str = 17;
stats.dex = 22;
stats.con = 17;
size = 1;
naturalac = 5;
print();

