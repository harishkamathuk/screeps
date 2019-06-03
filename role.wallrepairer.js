// import modules
var roleBuilder = require('role.builder');

var roleWallRepairer = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the controller
        // but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false
                  && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('⚡ repair the wall');
        }

        // if creep is supposed to be repairing something
        if (creep.memory.working == true) {

          // target to repair
          var target = undefined;

					// find all the walls in the room
					var walls = creep.room.find(FIND_STRUCTURES, {
              filter: (s) => s.structureType == STRUCTURE_WALL
          });

          // loop with increasing percentages
          for(let percentage = 0.0001; percentage <= 1; percentage += 0.0001) {

            // find a wall with less percentage of hitsMax
            for(let wall of walls) {
              if(wall.hits / wall.hitsMax < percentage) {
                target = wall;
                break;
              }
            }

            // if there is one proceed to repair
            if(target != undefined) {
              // break the loop
              break;
            }
          }

          // if we find a wall  to repair ...
					if(target != undefined) {
            // try to repair the wall
            // if it is out of range ...
						if(creep.repair(target) == ERR_NOT_IN_RANGE) {
              // ... move towards it.
							creep.moveTo(target, {
                visualizePathStyle: {stroke: '#00ff00'}
              });
						}
					}
					else { // look for construction sites
						roleBuilder.run(creep);
					}
        } else { // if creep is supposed to harvest energy from source
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ff00ff'}});
            }
        }
    }
};

module.exports = roleWallRepairer;
