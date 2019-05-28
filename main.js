// var roleHarvester = require("role.harvester");
// var roleUpgrader = require("role.upgrader");
// var roleBuilder = require("role.builder");

// noinspection JSUnresolvedVariable
module.exports.loop = function() {

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {

        // get the creep object
        var creep = Game.creeps[name];

        console.log(name + " is working: " + creep.memory.working);

        // if creep is bringing energy to the spawn but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working == true) {
            // try to transfer energy, if the spawn is not in range
            if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the spawn
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }


    // var tower = Game.getObjectById("6222b1f9532e9deb3b312fa0");
    // if (tower) {
    //   var closestDamagedStructure = tower.pos.findClosestByRange(
    //     FIND_STRUCTURES,
    //     {
    //       filter: structure => structure.hits < structure.hitsMax
    //     }
    //   );
    //   if (closestDamagedStructure) {
    //     tower.repair(closestDamagedStructure);
    //   }
    //
    //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //   if (closestHostile) {
    //     tower.attack(closestHostile);
    //   }
    // }
    //
    // for (var name in Memory.creeps) {
    //   if (!Game.creeps[name]) {
    //     delete Memory.creeps[name];
    //     console.log("Clearing non-existing creep memory:", name);
    //   }
    // }
    //
    // var harvesters = _.filter(
    //   Game.creeps,
    //   creep => creep.memory.role == "harvester"
    // );
    // console.log("Harvesters: " + harvesters.length);
    //
    // if (harvesters.length < 2) {
    //   var newName = "Harvester" + Game.time;
    //   console.log("Spawning new harvester: " + newName);
    //   Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
    //     memory: { role: "harvester" }
    //   });
    // }
    //
    // if (Game.spawns["Spawn1"].spawning) {
    //   var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    //   Game.spawns["Spawn1"].room.visual.text(
    //     "Spawning..." + spawningCreep.memory.role,
    //     Game.spawns["Spawn1"].pos.x + 1,
    //     Game.spawns["Spawn1"].pos.y,
    //     { align: "left", opacity: 0.8 }
    //   );
    // }
    //
    // for (var name in Game.creeps) {
    //   var creep = Game.creeps[name];
    //   if (creep.memory.role == "harvester") {
    //     roleHarvester.run(creep);
    //   }
    //   if (creep.memory.role == "upgrader") {
    //     roleUpgrader.run(creep);
    //   }
    //   if (creep.memory.role == "builder") {
    //     roleBuilder.run(creep);
    //   }
    // }
};
