// var roleHarvester = require("role.harvester");
// var roleUpgrader = require("role.upgrader");
// var roleBuilder = require("role.builder");

// noinspection JSUnresolvedVariable
module.exports.loop = function() {

  var creep = Game.creeps.Blake;

  if(creep.memory.working == true && creep.carry.energy == 0) {
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
    creep.memory.working = true;
  }

  if(creep.memory.working == true){
    if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
  }
  else {
    var source = creep.pos.findClosestByPath(FIND_SOURCES);
    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
      creep.moveTo(source);
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
