basestats = {
    str: 10,
    dex: 11,
    con: 13,
    'int': 16,
    wis: 17,
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
basehp = mod(basestats.con) * 9 + 8 + 8*4.5// replace 8*4.5 with 8d8

// Saves:

// # Skills
skillbase = {};

// lvl 1 - monk
skillbase.concentration = 4;
skillbase.diplomacy = 4;
skillbase.hide = 4;
skillbase.movesilent = 4;
skillbase.sensemotives = 4;
skillbase.listen = 4;
skillbase.spot = 4;

// lvl 2-9 druid
skillbase.concentration += 8;
skillbase.diplomacy += 8;
skillbase.listen += 8;
skillbase.spot += 8;
skillbase.survival = 8;
skillbase.knownature = 8;
skillbase.survival += 4; skillbase.knownature += 4;

skillability = {
    concentration: "con",
    diplomacy: "cha",
    hide: "dex",
    movesilent: "dex",
    sensemotives: "wis",
    listen: "wis",
    spot: "wis",
    survival: "wis",
    knownature: "int"
};

function skills() {
    var skill;
    var result = {};
    for(skill in skillbase) {
        result[skill] = skillbase[skill] + mod(stats[skillability[skill]]);
    }
    return result;
}

// creature size
// small = -1, normal = 0, large = +1, ...
size = 0;
// natural armor
naturalac = 0;

// Armor class
// same touch and 
function ac() {
    var fullac = 10 + naturalac + mod(stats.dex)
         + mod(/* monk unarmed bonus */stats.wis) - size;
    return { touch: fullac - naturalac,
             flatfooted: fullac - mod(stats.dex),
             normal: fullac};
}

for(stat in basestats) {
    console.log(stat, stats[stat], mod(stats[stat]));
}
console.log("skills:", skills());
console.log("ac:", ac());
console.log("hp:", basehp);
