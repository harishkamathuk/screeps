module.exports = function() {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep =
    function(energy, roleName) {

      // create a balanced body as big as possible with the given energy
      var numberOfParts = Math.floor(energy / 200);
      var body = [];

      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
      }

      for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
      }

      for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
      }

      // ... generate a new custom suffix for the name of the new creep ...
      newName = Game.time;
      if(roleName === 'harvester') {
        newName = 'HRV' + newName;
      } else if(roleName === 'builder'){
        newName = 'BLD' + newName;
      } else if(roleName === 'repairer'){
        newName = 'REP' + newName;
      }  else if(roleName === 'upgrader'){
        newName = 'UPG' + newName;
      }

      console.log("Spawning a new " + roleName + ": " + newName);
      return this.spawnCreep(
        body,
        newName,
        {
            memory: { role: roleName, working: false}
        });
    }
};