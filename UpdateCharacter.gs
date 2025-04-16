/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

// Honestly, I don't know what my thought process of making this into a class even was.
// I think it said something about classes in the assignment somewhere and I took that to
// heart. I can change this to just functions if I need to.

/*
 * !!! Usefull info !!!
 * only works for character sheet
 * 
 * newChar(...) - creates new table for a character
 * 
 * getTableByName(name) - returns table index for specified character name
 *  intended to be used to retrieve tableNum
 * 
 * setName(tableNum, name)/getName(tableNum) -  getter and setter for name
 *  tableNum: index of table on doc. Starts at 0
 *  name: new name
 * 
 * setClass(...)/getClass(...) - getter and setter for character class
 *  similar to set and get name
 * 
 * setStats(...)/getStats(...) - getter and setter for ALL character stats
 *  input must already be formated and a string
 * 
 * setStat(...)/getStat(...) - getter and setter for SPECIFIC stat
 * 
 * setDescription(...)/getDescription(...) - getter and setter for character description
 * 
 * setImage(...) - sets character image
 *  no getter at the moment
 * 
 * setInventory(...)/getInventory(...) - setter and getter for ALL character inventory
 *  input must already be formated and a string
 * 
 * setAttacks(...)/getAttacks(...) - setter and getter for ALL character attacks
 *  input must already be formated and a string
 */

function updateCharacter() {
  this.doc = DocumentApp.getActiveDocument();
  this.body = this.doc.getBody();

  // Maybe include all character, inventory, ect variables?

  // Check if document contains character
  // NOTE: only checks character stats. Need to update if other information is included
  this.tables = this.body.getTables();

  this.nameIndex = 0;
  this.classIndex = 1;
  this.statIndex = 2;
  this.descIndex = 3;
  this.imgIndex = 4;
  this.invIndex = 5;
  this.attackIndex = 6;
  this.typeIndex = 7;
}

updateCharacter.prototype.newCharacter = function(name, chrClass, stats, desc, inv, attacks, image) {
  tableData = [
    ["Name", name],
    ["Class", chrClass],
    ["Stats", stats],
    ["Description", desc],
    ["Image", ""],
    ["Inventory", inv],
    ["Attacks", attacks],
    ["Type","Character"]
  ];

  table = this.body.appendTable(tableData);

  try {
    const response = UrlFetchApp.fetch(image);
    const imageBlob = response.getBlob();
    const img = table.getCell(this.imgIndex, 1).insertImage(0, imageBlob);

    // Resize the image
    img.setWidth(120);
    img.setHeight(180);
  } catch (e) {
    table.getCell(this.imgIndex, 1).setText('Image failed to load.');
  }

  this.tables.push(table);
}

updateCharacter.prototype.getTableByName = function(name) {
  for(i = 0; i < this.tables.length; i++) {
    try {
      if (!this.isCharacter(i)) {
        continue;
      }
      
      if (this.tables[i].getCell(this.nameIndex, 1).getText() == name) {
        return i;
      }
    } catch(error) {
      // Table is not formated as character sheet. Ignore
      continue;
    }
  }

  return -1;
}

updateCharacter.prototype.isCharacter = function(tableNum) {
  try {
      if (this.tables[tableNum].getCell(this.typeIndex, 1).getText() == "Character") {
        return true;
      }
    } catch(error) {
      // Table is not formated as character sheet. Ignore
      return false;
    }

    return false;
}

updateCharacter.prototype.setName = function(tableNum, name) {
  this.tables[tableNum].getCell(this.nameIndex, 1).setText(name);
}

updateCharacter.prototype.getName = function(tableNum) {
  return this.tables[tableNum].getCell(this.nameIndex, 1);
}

updateCharacter.prototype.setClass = function(tableNum, charClass) {
  this.tables[tableNum].getCell(this.classIndex, 1).setText(charClass);
}

updateCharacter.prototype.getClass = function(tableNum) {
  return this.tables[tableNum].getCell(this.classIndex, 1);
}

// Set entire set of stats. Input is already formated string
updateCharacter.prototype.setStats = function(tableNum, stats) {
  this.tables[tableNum].getCell(this.statIndex, 1).setText(stats);
}

updateCharacter.prototype.getStats = function(tableNum) {
  return this.tables[tableNum].getCell(this.statIndex, 1);
}

updateCharacter.prototype.setDescription = function(tableNum, descritption) {
  this.tables[tableNum].getCell(this.descIndex, 1).setText(descritption);
}

updateCharacter.prototype.getDescription = function(tableNum) {
  return this.tables[tableNum].getCell(this.descIndex, 1);
}

updateCharacter.prototype.setImage = function(tableNum, img) {
  this.tables[tableNum].getCell(this.imgIndex, 1).clear().appendImage(img);
}

// I'm not entirely sure how to fetch the image from the doc
// updateCharacter.prototype.getImage = function(tableNum) {
//   this.tables[tableNum].getCell(this.imgIndex, 1)
// }

updateCharacter.prototype.setInventory = function(tableNum, inventory) {
  this.tables[tableNum].getCell(this.invIndex, 1).setText(inventory);
}

updateCharacter.prototype.getInventory = function(tableNum) {
  this.tables[tableNum].getCell(this.invIndex, 1).getText();
}

updateCharacter.prototype.setAttacks = function(tableNum, attacks) {
  this.tables[tableNum].getCell(this.attackIndexIndex, 1).setText(attacks);
}

updateCharacter.prototype.getAttacks = function(tableNum) {
  this.tables[tableNum].getCell(this.attackIndex, 1).getText();
}

// Sets specific stat as value. High-key some bad code, but it works
updateCharacter.prototype.setStat = function(tableNum, stat, value) {
  // Convert String into usable array. In format of [[STR, 1], [WIS, 1], ...]
  oldStatsString = this.tables[tableNum].getCell(this.statIndex, 1).getText().slice(1, -1);
  oldStatsArray = oldStatsString.split(",");

  for (i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i].split(":");
  }

  // Find and change stat value
  // Simple brute force approach
  for(i = 0; i < oldStatsArray.length; i++) {
    if (oldStatsArray[i][0] == stat) {
      oldStatsArray[i][1] = value;
    }
  }

  // Convert to string and set cell
  for(i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i][0] + ":" + oldStatsArray[i][1];
  }

  newStatsString = "[" + oldStatsArray.toString() + "]";
  this.tables[tableNum].getCell(this.statIndex, 1).setText(newStatsString);
}

updateCharacter.prototype.getStat = function(tableNum, stat) {
  // Convert String into usable array. In format of [[STR, 1], [WIS, 1], ...]
  oldStatsString = this.tables[tableNum].getCell(this.statIndex, 1).getText().slice(1, -1);
  oldStatsArray = oldStatsString.split(",");

  for (i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i].split(":");

    if (oldStatsArray[i][0] == stat) {
      return oldStatsArray[i][1];
    }
  }

  // Did not find stat
  return -1;
}

updateCharacter.prototype.getStatAsArray = function(tableNum) {
  oldStatsString = this.tables[tableNum].getCell(this.statIndex, 1).getText().slice(1, -1);
  oldStatsArray = oldStatsString.split(",");

  newStatsArray=[];
  for (i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i].split(":");
    newStatsArray[i]=oldStatsArray[i][1];
  }

  return newStatsArray;
}


function test() {
  var testClass = new updateCharacter();
  //testClass.body.clear();
  //testClass.newCharacter("bob", "test", "[AC:10,HP:3,SP:0,STR:0,DEX:0,CON:0,INT:0,WIS:0,CHA:0]", "this is a test", "[test]", "[test]", null);
  console.log(testClass.getStat(testClass.getTableByName("bob"), "AC"));

}