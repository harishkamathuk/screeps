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
  var MINIMUM_NUMBER_OF_UPGRADERS = 5;
  var MINIMUM_NUMBER_OF_BUILDERS = 10;
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


  console.log("Harvesters in service: " + numberOfHarvesters);
  console.log("Upgraders in service: " + numberOfUpgraders);
  console.log("Builders in service: " + numberOfBuilders);
  console.log("Repairers in service: " + numberOfRepairers);

  // auto-spawning code starts here ...
  var energyCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
  var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
  console.log("Energy capacity: " + energyCapacity);
  console.log("Energy available: " + energyAvailable);

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

      if (numberOfHarvesters < MINIMUM_NUMBER_OF_HARVESTERS) { // if not enough harvesters

          newName = 'HRV' + newName; // try to spawn one
          console.log("Spawning a harvester: " + newName);
          Game.spawns['Spawn1'].spawnCreep(
              [WORK,WORK,CARRY,MOVE],
              newName,
              {
                  memory: { role: 'harvester', working: false}
              });
      }
      else if (numberOfUpgraders < MINIMUM_NUMBER_OF_UPGRADERS) { // if not enough upgraders

          newName = 'UPG' + newName; // try to spawn one
          console.log("Spawning a upgrader: " + newName);
          Game.spawns['Spawn1'].spawnCreep(
              [MOVE,MOVE,CARRY,WORK],
              newName,
              {
                  memory: { role: 'upgrader', working: false}
              });
      }
      else if (numberOfRepairers < MINIMUM_NUMBER_OF_REPAIRERS) { // if not enough repairers

          newName = 'REP' + newName; // try to spawn one
          console.log("Spawning a repairer: " + newName);
          Game.spawns['Spawn1'].spawnCreep(
              [WORK,WORK,CARRY,MOVE],
              newName,
              {
                  memory: { role: 'repairer', working: false}
              });
      }
      else if (numberOfBuilders < MINIMUM_NUMBER_OF_BUILDERS) { // if not enough builders

          newName = 'BLD' + newName; // try to spawn one
          console.log("Spawning a builder: " + newName);
          Game.spawns['Spawn1'].spawnCreep(
              [WORK,WORK,CARRY,MOVE],
              newName,
              {
                  memory: { role: 'builder', working: false}
              });
      }
      else { // else try to spawn an builder

          newName = 'BLD' + newName;
          console.log("Spawning a builder: " + newName);
          Game.spawns['Spawn1'].spawnCreep(
              [MOVE, MOVE, CARRY, WORK],
              newName,
              {
                  memory: {role: 'builder', working: false}
              });
      }

  }

  // checking the status of the spawning process here ...
  if (Game.spawns["Spawn1"].spawning) {

      var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      console.log("Spawning creep: " + spawningCreep.name)
      Game.spawns["Spawn1"].room.visual.text(
          "Spawning: " + spawningCreep.memory.role,
          Number(Game.spawns["Spawn1"].pos.x) + 1,
          Number(Game.spawns["Spawn1"].pos.y),
          { align: "left", opacity: 0.8 }
      );
  }
};
