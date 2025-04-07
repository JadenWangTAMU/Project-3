function Character(AC, HP, SP, STR, DEX, CON, INT, WIS, CHA) { // constructor function
  this.AC = AC;  // Armor Class
  this.HP = HP;  // Hit Points
  this.SP = SP;  // Speed
  this.STR = STR;  // Strength
  this.DEX = DEX;  // Dexterity
  this.CON = CON;  // Constitution
  this.INT = INT;  // Intelligence
  this.WIS = WIS;  // Wisdom
  this.CHA = CHA;  // Charisma
}

function createCharacterInScript(AC, HP, SP, STR, DEX, CON, INT, WIS, CHA) {
  var newCharacter=new Character(AC, HP, SP, STR, DEX, CON, INT, WIS, CHA);
  var results = [];
  results.push(newCharacter.AC);
  results.push(newCharacter.HP);
  results.push(newCharacter.SP);
  results.push(newCharacter.STR);
  results.push(newCharacter.DEX);
  results.push(newCharacter.CON);
  results.push(newCharacter.INT);
  results.push(newCharacter.WIS);
  results.push(newCharacter.CHA);
  return results;
}