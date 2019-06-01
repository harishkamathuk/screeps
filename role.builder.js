// import modules
var roleUpgrader = require('role.upgrader');

var roleBuilder = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('⚡ build');
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
						// find construction sites
						var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
						if(constructionSite != undefined) {
								if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
									creep.moveTo(constructionSite);
								}
						}
						else {
							roleUpgrader.run(creep);
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

module.exports = roleBuilder;
