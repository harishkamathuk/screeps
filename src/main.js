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

/*

The Controller upgrade gives access to some new structures: walls, ramparts, and extensions. We’ll discuss walls and ramparts in the next Tutorial section, for now let’s talk about extensions.

Extensions are required to build larger creeps. A creep with only one body part of one type works poorly. Giving it several WORKs will make him work proportionally faster.

However, such a creep will be costly and a lone spawn can only contain 300 energy units. To build creeps costing over 300 energy units you need spawn extensions.

The second Controller level has 5 extensions available for you to build. This number increases with each new level.

You can place extensions at any spot in your room, and a spawn can use them regardless of the distance. In this Tutorial we have already placed corresponding construction sites for your convenience.



*/
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );

/*
Our new creep won’t move until we define the behavior for the role builder.

Excellent, all the structures are filled with energy. It’s time to build somebody large!

*/

//Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],'HarvesterBig',{ memory: { role: 'harvester' } } );

/*
Building this creep took energy from all storages and completely drained them.

Now let’s select our creep and watch it work.

Click on the creep Harvester2.

As you can see on the right panel, this powerful creep harvests 8 energy units per tick. A few such creeps can completely drain an energy source before it refills thus giving your colony a maximum energy boost.

Hence, by upgrading your Controller, constructing new extensions and more powerful creeps, you considerably improve the effectiveness of your colony work. Also, by replacing a lot of small creeps with fewer large ones, you save CPU resources on controlling them which is an important prerequisite to play in the online mode.

In the next section, we’ll talk about how to set up the automatic manufacturing of new creeps.

*/

/*
Tutorial section #4 Auto-spawning creeps

Until now, we have created new creeps directly in the console. It’s not a good idea to do it constantly since the very idea of Screeps is making your colony control itself. You will do well if you teach your spawn to produce creeps in the room on its own.

This is a rather complicated topic and many players spend months perfecting and refining their auto-spawning code. But let’s try at least something simple and master some basic principles to start with.

*/
/*

Now let’s try to emulate a situation when one of our harvesters dies. You can now give the command suicide to the creep via the console or its properties panel on the right.

Make one of the harvesters suicide.
Documentation:
Creep.suicide
*/

// Game.creeps['Harvester1'].suicide()

/*

As you can see from the console, after we lacked one harvester, the spawn instantly started building a new one with a new name.

*/

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

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

