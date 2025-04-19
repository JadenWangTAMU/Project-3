function updateEnvironment() {
  this.doc = DocumentApp.getActiveDocument();
  this.body = this.doc.getBody();
  this.tables = this.body.getTables();

  this.nameIndex = 0;
  this.descIndex = 1;
  this.imgIndex = 2;
  this.typeIndex = 3;
}

updateEnvironment.prototype.newEnvironment = function(name, desc, image) {
  tableData = [
    ["Name", name],
    ["Description", desc],
    ["Image", ""],
    ["Type", "Environment"]
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

updateEnvironment.prototype.getTableByName = function(name) {
  for(var i = 0; i < this.tables.length; i++) {
    try {
      if (!this.isEnvironment(i)) {
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

updateEnvironment.prototype.isEnvironment = function(tableNum) {
  try {
      if (this.tables[tableNum].getCell(this.typeIndex, 1).getText() == "Environment") {
        return true;
      }
    } catch(error) {
      // Table is not formated as character sheet. Ignore
      return false;
    }

    return false;
}

updateEnvironment.prototype.setName = function(tableNum, name) {
  this.tables[tableNum].getCell(this.nameIndex, 1).setText(name);
}

updateEnvironment.prototype.getName = function(tableNum) {
  return this.tables[tableNum].getCell(this.nameIndex, 1);
}

updateEnvironment.prototype.setDescription = function(tableNum, descritption) {
  this.tables[tableNum].getCell(this.descIndex, 1).setText(descritption);
}

updateEnvironment.prototype.getDescription = function(tableNum) {
  return this.tables[tableNum].getCell(this.descIndex, 1);
}

updateEnvironment.prototype.setImage = function(tableNum, img) {
  this.tables[tableNum].getCell(this.imgIndex, 1).clear().appendImage(img);
}