var roleHarvester = {
    // a function to run the logic for this role
    run: function(creep) {

        // if creep is bringing energy to the spawn or an extension
        // but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('🚚 deliver');
        }

        // if creep is supposed to transfer energy to the spawn
        // or an extension
        if (creep.memory.working == true) {
            // find closest Spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
              // the second argument for findClosestByPath is an object which takes
              // a property called filter which can be a function
              // we use the arrow operator to define it
              filter: (s) => s.energy < s.energyCapacity
            });
            // if we find one ...
            // transfer energy to it if it is in range or ...
            console.log("Structure: " + structure + ". Energy available: "
              + s.energy + ". Energy capacity:" + s.energyCapacity);
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards the structure
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source, {visualizePathStyle: {stroke: '#0000ff'}});
            }
        }
    }
};

module.exports = roleHarvester;
