function updateInventory() {
  this.doc = DocumentApp.getActiveDocument();
  this.body = this.doc.getBody();
  this.tables = this.body.getTables();

  this.nameIndex = 0;
  this.statIndex = 1;
  this.descIndex = 2;
  this.imgIndex = 3;
  this.ownIndex = 4;
  this.typeIndex = 5;
}

updateInventory.prototype.newInventory = function(name, stats, desc, image, owner) {
  tableData = [
    ["Name", name],
    ["Stats", stats],
    ["Description", desc],
    ["Image", ""],
    ["Owner", owner],
    ["Type", "Inventory"]
  ];

  table = this.body.appendTable(tableData);

  try {
    const response = UrlFetchApp.fetch(image);
    const imageBlob = response.getBlob();
    const img = table.getCell(this.imgIndex, 1).insertImage(0, imageBlob);
    img.setLinkUrl(image);

    // Resize the image
    img.setWidth(120);
    img.setHeight(180);
  } catch (e) {
    table.getCell(this.imgIndex, 1).setText('Image failed to load.');
  }

  this.tables.push(table);
}

updateInventory.prototype.getTableByName = function(name) {
  for(var i = 0; i < this.tables.length; i++) {
    try {
      if(!this.isInventory(i)) {
        continue;
      }

      if (this.tables[i].getCell(this.nameIndex, 1).getText() == name) {
        return i;
      }
    } catch(error) {
      continue;
    }
  }

  return -1;
}

updateInventory.prototype.isInventory = function(tableNum) {
  try {
      if (this.tables[tableNum].getCell(this.typeIndex, 1).getText() == "Inventory") {
        return true;
      }
    } catch(error) {
      // Table is not formated as character sheet. Ignore
      return false;
    }

    return false;
}

updateInventory.prototype.setName = function(tableNum, name) {
  this.tables[tableNum].getCell(this.nameIndex, 1).setText(name);
}

updateInventory.prototype.getName = function(tableNum) {
  return this.tables[tableNum].getCell(this.nameIndex, 1);
}

// Set entire set of stats. Input is already formated string
updateInventory.prototype.setStats = function(tableNum, stats) {
  this.tables[tableNum].getCell(this.statIndex, 1).setText(stats);
}

updateInventory.prototype.getStats = function(tableNum) {
  return this.tables[tableNum].getCell(this.statIndex, 1);
}

updateInventory.prototype.setDescription = function(tableNum, descritption) {
  this.tables[tableNum].getCell(this.descIndex, 1).setText(descritption);
}

updateInventory.prototype.getDescription = function(tableNum) {
  return this.tables[tableNum].getCell(this.descIndex, 1);
}

updateInventory.prototype.setOwner = function(tableNum, owner) {
  this.tables[tableNum].getCell(this.ownIndex, 1).setText(owner);
}

updateInventory.prototype.getOwner = function(tableNum) {
  return this.tables[tableNum].getCell(this.ownIndex, 1);
}

updateInventory.prototype.setImage = function(tableNum, img) {
  this.tables[tableNum].getCell(this.imgIndex, 1).clear().appendImage(img);
}

// Sets specific stat as value. High-key some bad code, but it works
updateInventory.prototype.setStat = function(tableNum, stat, value) {
  // Convert String into usable array. In format of [[STR, 1], [WIS, 1], ...]
  oldStatsString = this.tables[tableNum].getCell(this.statIndex, 1).getText().slice(1, -1);
  oldStatsArray = oldStatsString.split(",");

  for (var i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i].split(":");
  }

  // Find and change stat value
  // Simple brute force approach
  for(var i = 0; i < oldStatsArray.length; i++) {
    if (oldStatsArray[i][0] == stat) {
      oldStatsArray[i][1] = value;
    }
  }

  // Convert to string and set cell
  for(var i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i][0] + ":" + oldStatsArray[i][1];
  }

  newStatsString = "[" + oldStatsArray.toString() + "]";
  this.tables[tableNum].getCell(this.statIndex, 1).setText(newStatsString);
}

updateInventory.prototype.getStat = function(tableNum, stat) {
  // Convert String into usable array. In format of [[STR, 1], [WIS, 1], ...]
  oldStatsString = this.tables[tableNum].getCell(this.statIndex, 1).getText().slice(1, -1);
  oldStatsArray = oldStatsString.split(",");

  for (var i = 0; i < oldStatsArray.length; i++) {
    oldStatsArray[i] = oldStatsArray[i].split(":");

    if (oldStatsArray[i][0] == stat) {
      return oldStatsArray[i][1];
    }
  }

  // Did not find stat
  return -1;
}