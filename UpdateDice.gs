function updateDice() {
  this.doc = DocumentApp.getActiveDocument();
  this.body = this.doc.getBody();
  this.tables = this.body.getTables();

  this.diceNumberIndex = 0;
  this.lowestNumberIndex = 1;
  this.greatestNumberIndex = 2;
  this.diceIndex = 3;
  this.averageRollIndex = 4;
  this.rollHistoryIndex = 5;
}

updateDice.prototype.newDice = function(diceNumber, lowestNumber, greatestNumber, dice, averageRoll, rollHistory) {
  tableData = [
    ["Dice Number", diceNumber],
    ["Lowest Number", lowestNumber],
    ["Greatest Number", greatestNumber],
    ["Last Roll", "["+dice+"]"],
    ["Average Roll", "["+averageRoll+"]"],
    ["Roll History", "["+rollHistory+"]"]
  ];

  table = this.body.appendTable(tableData);

  this.tables.push(table);
}

updateDice.prototype.getTableByRollHistory = function(rollHistory) {
  for(i = 0; i < this.tables.length; i++) {
    try {
      if (this.tables[i].getCell(this.rollHistoryIndex, 1).getText() == rollHistory) {
        return i;
      }
    } catch(error) {
      continue;
    }
  }

  return -1;
}

updateDice.prototype.setDiceNumber = function(tableNum, diceNumber) {
  this.tables[tableNum].getCell(this.diceNumberIndex, 1).setText(diceNumber);
}

updateDice.prototype.getName = function(tableNum) {
  return this.tables[tableNum].getCell(this.diceNumberIndex, 1);
}

updateDice.prototype.setLowestNumber = function(tableNum, lowestNumber) {
  this.tables[tableNum].getCell(this.lowestNumberIndex, 1).setText(lowestNumber);
}

updateDice.prototype.getLowestNumber = function(tableNum) {
  return this.tables[tableNum].getCell(this.lowestNumberIndex, 1);
}

updateDice.prototype.setHighestNumber = function(tableNum, highestNumber) {
  this.tables[tableNum].getCell(this.highestNumberIndex, 1).setText(highestNumber);
}

updateDice.prototype.getHighestNumber = function(tableNum) {
  return this.tables[tableNum].getCell(this.highestNumberIndex, 1);
}

updateDice.prototype.setDice = function(tableNum, dice) {
  this.tables[tableNum].getCell(this.diceIndex, 1).setText(dice);
}

updateDice.prototype.getDice = function(tableNum) {
  return this.tables[tableNum].getCell(this.diceIndex, 1);
}

updateDice.prototype.setAverageRoll = function(tableNum, averageRoll) {
  this.tables[tableNum].getCell(this.averageRollIndex, 1).setText(averageRoll);
}

updateDice.prototype.getAverageRoll = function(tableNum) {
  return this.tables[tableNum].getCell(this.averageRollIndex, 1);
}

updateDice.prototype.setRollHistory = function(tableNum, rollHistory) {
  this.tables[tableNum].getCell(this.rollHistoryIndex, 1).setText(rollHistory);
}

updateDice.prototype.getRollHistory = function(tableNum) {
  return this.tables[tableNum].getCell(this.rollHistoryIndex, 1);
}