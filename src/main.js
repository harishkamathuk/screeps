// initialize creep on console
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );

/*
In this Tutorial section we’ll talk about a key strategic object in your room: Room Controller. By controlling this invincible structure you can build facilities in the room. The higher the controller level, the more structures available to build.
*/
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );

// Game.creeps['Harvester1'].memory.role = 'harvester';
// Game.creeps['Upgrader1'].memory.role = 'upgrader';

/*
Perfect, you have upgraded your Controller level!

Important: If you don’t upgrade your Controller within 20,000 game ticks, it loses one level. On reaching level 0, you will lose control over the room, and another player will be able to capture it freely. Make sure that at least one of your creeps regularly performs the function upgradeController.
*/

/*
Tutorial - section #3
The Controller upgrade gives access to some new structures: walls, ramparts, and extensions. We’ll discuss walls and ramparts in the next Tutorial section, for now let’s talk about extensions.

Extensions are required to build larger creeps. A creep with only one body part of one type works poorly. Giving it several WORKs will make him work proportionally faster.

However, such a creep will be costly and a lone spawn can only contain 300 energy units. To build creeps costing over 300 energy units you need spawn extensions.

The second Controller level has 5 extensions available for you to build. This number increases with each new level.

You can place extensions at any spot in your room, and a spawn can use them regardless of the distance. In this Tutorial we have already placed corresponding construction sites for your convenience.

Our new creep won’t move until we define the behavior for the role builder.

*Excellent, all the structures are filled with energy. It’s time to build somebody large!*
*/

// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );

// Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig', { memory: { role: 'harvester' } } );

var roleHarvester = require("role.harvester");
var roleBuilder = require("role.builder");

module.exports.loop = function() {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
