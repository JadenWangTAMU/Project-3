/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

function ExportTable(tableNum, fileName) {
  doc = DocumentApp.getActiveDocument();
  body = doc.getBody();
  table = this.body.getTables()[tableNum];

  fileData = "";

  for (var i = 0; i < table.getNumRows(); i++) {
    attribute = table.getCell(i, 0).getText();
    
    if (attribute == "Image") {
      value = table.getCell(i, 1).getChild(0).getChild(0).asInlineImage().getLinkUrl();
    } else {
      value = table.getCell(i, 1).getText();
    }

    fileData = fileData + attribute;
    fileData = fileData + ",\"" + value + "\"\n";
  }

  var file = DriveApp.createFile(fileName + ".csv", fileData, MimeType.CSV);
  return file.getUrl();
}

function ExportAllTables(fileNameScheme) {
  doc = DocumentApp.getActiveDocument();
  body = doc.getBody();
  numTables = this.body.getTables().length;

  for (var i = 0; i < numTables; i++) {
    ExportTable(i, fileNameScheme + "_" + i);
    console.log(i)
  }
} 

function ImportFile(base64Content) {
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Content));
  const content = Utilities.parseCsv(blob.getDataAsString().trim());  // Use parseCsv to handle CSV correctly

  // Assuming the data looks like this:
  // [0][1] = Name, [1][1] = Class, [2][1] = Stats, [3][1] = Description, ...
  // Handle content processing row by row
  const charClass = new updateCharacter();
  const encClass = new updateEncounter();
  const envClass = new updateEnvironment();
  const invClass = new updateInventory();
  const dicClass = new updateDice();

  const type = content[content.length - 1][1];  // The last row should indicate the type (Character, Encounter, etc.)

  // Debugging: Log the full content to see the parsed data
  console.log(content);

  if (type == "Character") {
    charClass.newCharacter(content[0][1], content[1][1], content[2][1], content[3][1], content[5][1], content[6][1], content[4][1]);
  } else if (type == "Encounter") {
    encClass.newEncounter(content[0][1], content[1][1], content[2][1], content[3][1]);
  } else if (type == "Environment") {
    envClass.newEnvironment(content[0][1], content[1][1], content[2][1]);
  } else if (type == "Inventory") {
    invClass.newInventory(content[0][1], content[1][1], content[2][1], content[3][1], content[4][1]);
  } else if (type == "Dice") {
    dicClass.newDice(content[0][1], content[1][1], content[2][1], content[3][1], content[4][1], content[5][1]);
  } else {
    console.log("Unrecognized table type.");
  }
}

function findTable(tableIdentifier) {
  // Why did i make it a class. that was very dumb and kinda a waste.
  // I should fix this but im currently crashing out rn
  var charClass = new updateCharacter();
  var encClass = new updateEncounter();
  var envClass = new updateEnvironment();
  var invClass = new updateInventory();
  var dicClass = new updateDice();

  if (charClass.getTableByName(tableIdentifier) > -1) {
    return charClass.getTableByName(tableIdentifier);
  } else if (encClass.getTableByName(tableIdentifier) > -1) {
    return encClass.getTableByName(tableIdentifier);
  } else if (envClass.getTableByName(tableIdentifier) > -1) {
    return envClass.getTableByName(tableIdentifier);
  } else if(invClass.getTableByName(tableIdentifier) > -1) {
    return invClass.getTableByName(tableIdentifier);
  } else if (dicClass.getTableByRollHistory(tableIdentifier) > -1) {
    return dicClass.getTableByRollHistory(tableIdentifier);
  }

  // Not found :(
  return -1;
}

function getFileContent(fileName) {
  var file = DriveApp.getFilesByName(fileName + ".csv"); // or use .getFilesByName()
  ImportFile(Utilities.base64Encode(file.next().getBlob().getBytes()));
}

// function test2() {
//   getFileContent("test_1.csv");
// }
