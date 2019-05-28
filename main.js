// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

     // some constants
    var MAXIMUM_NUMBER_OF_HARVESTERS = 10;


    // state of play at the beginning of each tick
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    console.log("Harvesters needed: " + MAXIMUM_NUMBER_OF_HARVESTERS);
    console.log("Harvesters in service: " + numberOfHarvesters);
    console.log("Upgraders in service: " + numberOfUpgraders);


    // house keeping time ...
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
            console.log("Cleaning memory for creep:" + name);
        }
    }

    // do the job, creeps ...
    for (let name in Game.creeps) { // for every creep name in Game.creeps

        var creep = Game.creeps[name]; // get the creep object

        if (creep.memory.role == 'harvester') { // if creep is harvester, call harvester script
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') { // if creep is upgrader, call upgrader script
            roleUpgrader.run(creep);
        }
        // console.log("Creep " + name + " is a " + creep.memory.role + " and doing its job!");
    }

    // auto-spawning code starts here ...
    var newName = 'CreepCheck';

    var canSpawn = Game.spawns['Spawn1'].spawnCreep(
        [WORK, WORK, CARRY, MOVE],
        newName,
        { dryRun: true }
        ); // check if we can spawn a new creep...

    // ... if we can ...
    if(canSpawn === OK) {

        // ... generate a new custom suffix for the name of the new creep ...
        newName = Game.time;

        if (numberOfHarvesters < MAXIMUM_NUMBER_OF_HARVESTERS) { // if not enough harvesters

            newName = 'HRV' + newName; // try to spawn one
            console.log("Spawning a harvester: " + newName);
            Game.spawns['Spawn1'].spawnCreep(
                [WORK,WORK,CARRY,MOVE],
                newName,
                {
                    memory: { role: 'harvester', working: false}
                });
        }
        else { // else try to spawn an upgrader

            newName = 'UPG' + newName;
            console.log("Spawning a upgrader: " + newName);
            Game.spawns['Spawn1'].spawnCreep(
                [MOVE, MOVE, CARRY, WORK],
                newName,
                {
                    memory: {role: 'upgrader', working: false}
                });
        }

    }

    // checking the status of the spawning process here ...
    if (Game.spawns["Spawn1"].spawning) { // are we spawning a creep...

        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];

        console.log("Spawning creep: " + spawningCreep.name);
        console.log("role: " + spawningCreep.memory.role);

        Game.spawns["Spawn1"].room.visual.text(
            "Spawning a " + spawningCreep.memory.role,
            Game.spawns["Spawn1"].pos.x + 1,
            Game.spawns["Spawn1"].pos.y,
            { align: "left", opacity: 0.8 }
        );
    }


};
