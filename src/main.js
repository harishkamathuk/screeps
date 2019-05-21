// initialize creep on console
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );


/*
In this Tutorial section we’ll talk about a key strategic object in your room: Room Controller. By controlling this invincible structure you can build facilities in the room. The higher the controller level, the more structures available to build.
*/
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );

// Game.creeps['Harvester1'].memory.role = 'harvester';
// Game.creeps['Upgrader1'].memory.role = 'upgrader';



var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

