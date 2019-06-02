// import modules
var roleBuilder = require('role.builder');

var roleRepairer = {
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
            creep.say('⚡ repair');
        }

        // if creep is supposed to be repairing something
        if (creep.memory.working == true) {
						// find closest structures with less than max hits
            // Exclude walls as they have way too many max hits
            // and would keep our repairers very busy for a long
            // time!
						var structure =
              creep.pos.findClosestByPath(FIND_STRUCTURES, {
              // the second argument for findClosestByPath is an object
              // which takes a property called filter which can be a function
              // we use the arrow operator to define interval
              filter: (s) => s.hits < s.hitsMax
                && s.structureType != STRUCTURE_WALL
            });

            // if we find a structure to repair ...
						if(structure != undefined) {
              // try to repair the structure
              // if it is out of range ...
							if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                // ... move towards it.
								creep.moveTo(structure, {
                  visualizePathStyle: {stroke: '#00ff00'}
                });
							}
						}
						else { // look for construction sites
							roleBuilder.run(creep);
						}
        }
        // if creep is supposed to harvest energy from source
        else {
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

module.exports = roleRepairer;
