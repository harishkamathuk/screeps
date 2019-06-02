// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')

module.exports.loop = function () {

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
      } else if (creep.memory.role == 'builder') { // if creep is upgrader, call upgrader script
            roleBuilder.run(creep);
      } else if (creep.memory.role == 'repairer') { // if creep is upgrader, call repairer script
            roleRepairer.run(creep);
      }
      // console.log("Creep " + name + " is a " + creep.memory.role + " and doing its job!");
  }

  // some constants
  var MINIMUM_NUMBER_OF_HARVESTERS = 10;
  var MINIMUM_NUMBER_OF_UPGRADERS = 2;
  var MINIMUM_NUMBER_OF_BUILDERS = 2;
  var MINIMUM_NUMBER_OF_REPAIRERS = 2;

  // console.log("Harvesters needed: " + MINIMUM_NUMBER_OF_HARVESTERS);
  // console.log("Builders needed: " + MINIMUM_NUMBER_OF_BUILDERS);
  // console.log("Upgraders needed: " + MINIMUM_NUMBER_OF_UPGRADERS);
  // console.log("Repairer needed: " + MINIMUM_NUMBER_OF_REPAIRERS);

  // state of play at the beginning of each tick
  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');


  // console.log("Harvesters in service: " + numberOfHarvesters);
  // console.log("Upgraders in service: " + numberOfUpgraders);
  // console.log("Builders in service: " + numberOfBuilders);
  // console.log("Repairers in service: " + numberOfRepairers);

  // auto-spawning code starts here ...
  var energyCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
  var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;

  if (numberOfHarvesters < MINIMUM_NUMBER_OF_HARVESTERS) { // if not enough harvesters

    // unable to create a creep with maximum available capacity
    // and we have no more harvesters ...
    if(Game.spawns['Spawn1'].createCustomCreep(energyCapacity,
    'harvester') !== OK && numberOfHarvesters === 0) {

      // create a harvest with available energy
      Game.spawns['Spawn1'].createCustomCreep(energyAvailable,
      'harvester');
    }
  } else if (numberOfUpgraders < MINIMUM_NUMBER_OF_UPGRADERS) { // if not enough upgraders

    Game.spawns['Spawn1'].createCustomCreep(energyCapacity,
      'upgrader')
  } else if (numberOfRepairers < MINIMUM_NUMBER_OF_REPAIRERS) { // if not enough repairers

    Game.spawns['Spawn1'].createCustomCreep(energyCapacity,
      'repairer')
  } else if (numberOfBuilders < MINIMUM_NUMBER_OF_BUILDERS) { // if not enough builders

    Game.spawns['Spawn1'].createCustomCreep(energyCapacity,
      'builder')
  } else { // else try to spawn an builder

    Game.spawns['Spawn1'].createCustomCreep(energyCapacity,
      'builder')
  }

  // checking the status of the spawning process here ...
  if (Game.spawns["Spawn1"].spawning) {

      var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      Game.spawns["Spawn1"].room.visual.text(
          "Spawning: " + spawningCreep.memory.role,
          Number(Game.spawns["Spawn1"].pos.x) + 1,
          Number(Game.spawns["Spawn1"].pos.y),
          { align: "left", opacity: 0.8 }
      );
  }
};
