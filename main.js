// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
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
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

    // goal: have 10 harvesters and as many upgraders as possible
    var minimumNumberOfHarvesters = 10;
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    console.log("We need " + minimumNumberOfHarvesters + " and we have "
        + numberOfHarvesters + " harvesters in service.");
    console.log("We have " + numberOfUpgraders + " upgraders in service.");

    // first check if we can spawn a new creep...
    var newName = 'WorkerCheck';
    var canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE],
        newName, { dryRun: true });

    // ... if we can ...
    if( canSpawn === OK) {

        // ... generate a new custom suffix for the name of the new creep ...
        newName = Game.time;

        // if not enough harvesters
        if (numberOfHarvesters < minimumNumberOfHarvesters) {
            // try to spawn one
            newName = 'Harvester' + newName;
            console.log("Spawning a harvester: " + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, {
                memory: { role: 'harvester', working: false}
            });

        }
        else {
            // else try to spawn an upgrader
            // small change from what you saw in the video: for upgraders it makes
            //  more sense to have two move parts because they have to travel further
            newName = 'Harvester' + newName;
            console.log("Spawning a upgrader: " + newName);
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, CARRY, WORK], newName, {
                memory: {role: 'upgrader', working: false}
            });
        }

        if (Game.spawns["Spawn1"].spawning) {
            var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
            Game.spawns["Spawn1"].room.visual.text(
                "Spawning: " + spawningCreep.memory.role,
                Game.spawns["Spawn1"].pos.x + 1,
                Game.spawns["Spawn1"].pos.y,
                { align: "left", opacity: 0.8 }
            );
        }
    }

};
