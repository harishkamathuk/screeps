// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] === undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
            console.log("Cleaning memory for creep:" + name);
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];
        console.log("Check if creep :" + name + " is doing: " + creep.memory.role);

        // if creep is harvester, call harvester script
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

    // goal: have 10 harvesters and as many upgraders as possible
    var minimumNumberOfHarvesters = 10;
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
    var name = undefined;


    console.log("We need " + minimumNumberOfHarvesters + " and we have " + numberOfHarvesters + " harvesters in service.")
    console.log("We have " + numberOfUpgraders + " upgraders in service.")

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        // name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
        //     { role: 'harvester', working: false});
        console.log("Spawning a harvester now ... ")
        name = Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    }
    else {
        // else try to spawn an upgrader
        // small change from what you saw in the video: for upgraders it makes
        //  more sense to have two move parts because they have to travel further
        // name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
        //     { role: 'upgrader', working: false});
        console.log("Spawning a upgrader now ... ")
        name = Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, CARRY, WORK], undefined,
            { role: 'upgrader', working: false});
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
};
