/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  DocumentApp.getUi()
      .createAddonMenu()
      .addItem('Show sidebar', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle("Sidebar")
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
}

/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */

function showCharacter() {
  var ui = HtmlService.createTemplateFromFile('CharacterSheet')
      .evaluate()
      .setWidth(420)
      .setHeight(630)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Create Character");
}

/**
 * Returns the existing footer text (if any).
 *
 * @return {String} existing document footer text (as a plain string).
 */
function getFooterText() {
  // Retrieve and return the information requested by the sidebar.
  var footer = DocumentApp.getActiveDocument().getFooter();
  if (footer == null) {
    return '';
  }
  return footer.getText();
}

/**
 * Replaces the current document footer with the given text.
 *
 * @param {String} footerText text collected from the client-side
 *     sidebar.
 */
function setFooterText(footerText) {
  // Use data collected from sidebar to manipulate the document.
  var footer = DocumentApp.getActiveDocument().getFooter();
  if (footer == null) {
    footer = DocumentApp.getActiveDocument().addFooter();
  }
  footer.setText(footerText);
}

/**
 * Returns the document title.
 *
 * @return {String} the current document title.
 */
function getDocTitle() {
  // Retrieve and return the information requested by the dialog.
  return DocumentApp.getActiveDocument().getName();
}

/**
 * Changes the document title.
 *
 * @param {String} title the new title to use for the document.
 */
function setDocTitle(title) {
  // Use data collected from dialog to manipulate the document.
  DocumentApp.getActiveDocument().setName(title);
}

function showDiceRoller() {
  var ui = HtmlService.createTemplateFromFile('DiceRoller')
      .evaluate()
      .setWidth(360)
      .setHeight(450)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Dice Roller");
}

function showEncounter() {
  var ui = HtmlService.createTemplateFromFile('Encounter')
      .evaluate()
      .setWidth(420)
      .setHeight(530)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Generate Encounter");
}

function showEnvironment() {
  var ui = HtmlService.createTemplateFromFile('Environment')
      .evaluate()
      .setWidth(430)
      .setHeight(490)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Generate Environment");
}

function showVisualizeStats() {
  var ui = HtmlService.createTemplateFromFile('VisualizeStats')
      .evaluate()
      .setWidth(500)
      .setHeight(590)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Visualize Stats");
}

function showInventory() {
  var ui = HtmlService.createTemplateFromFile('Inventory')
      .evaluate()
      .setWidth(420)
      .setHeight(590)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Inventory");
}

function showProbability() {
  var ui = HtmlService.createTemplateFromFile('ProbabilityCalc')
      .evaluate()
      .setWidth(700)
      .setHeight(570)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Generate Probability");
}

function showImport() {
  var ui = HtmlService.createTemplateFromFile('import')
      .evaluate()
      .setWidth(300)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Import File From Drive");
}

function showExport() {
  var ui = HtmlService.createTemplateFromFile('export')
      .evaluate()
      .setWidth(550)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(ui, "Export File to Drive");
}

function insertCharacterToDoc(name, title, statsArray, description, inventory, attacks, imageUrl) {
  var testClass=new updateCharacter();
  var firstCharInv = inventory.charAt(0);
  var lastCharInv = inventory.charAt(inventory.length - 1);
  if(!(firstCharInv==="[")){
    inventory="["+inventory;
  }
  if(!(lastCharInv==="]")){
    inventory=inventory+"]";
  }
  testClass.newCharacter(name, title, statsArray, description, inventory, attacks, imageUrl);
  var trimmedInv = inventory.substring(1, inventory.length - 1);
  var invItems = trimmedInv ? trimmedInv.split(",") : [];
  for(var i=0; i<invItems.length; i++){
    insertInventoryToDoc(invItems[i], "", "", "https://upload.wikimedia.org/wikipedia/commons/5/5a/Black_question_mark.png", name, true);
  }
}

function insertInventoryToDoc(name, statsArray, description, imageUrl, owner, fromCharacter) {
  var testClass=new updateInventory();
  testClass.newInventory(name, statsArray, description, imageUrl, owner);
  
  if(!fromCharacter){
    var testClassCharacter=new updateCharacter();
    var characterNumber=testClassCharacter.getTableByName(owner);
    console.log(characterNumber);
    if(characterNumber!=-1){
      var currentInv=testClassCharacter.getInventory(characterNumber);
      var trimmedInv = currentInv.substring(1, currentInv.length - 1);
      var invItems = trimmedInv ? trimmedInv.split(",") : [];
      invItems.push(name);
      var updatedInvItems = "[" + invItems.join(",") + "]";
      testClassCharacter.setInventory(characterNumber, updatedInvItems);
    }
  }
}
function insertEncounterToDoc(name, statsArray, description, imageUrl) {
  var testClass=new updateEncounter();
  testClass.newEncounter(name, statsArray, description, imageUrl);
}

function insertEnvironmentToDoc(name, description, imageUrl) {
  var testClass=new updateEnvironment();
  testClass.newEnvironment(name, description, imageUrl);
}

function insertDiceToDoc(diceNumber, lowestNumber, greatestNumber, dice, averageRoll, rollHistory) {
  var testClass=new updateDice();
  testClass.newDice(diceNumber, lowestNumber, greatestNumber, dice, averageRoll, rollHistory);
}

function searchCharacterInDoc(name) {
  var testClass=new updateCharacter();
  var testNum=testClass.getTableByName(name);
  console.log(name);
  console.log(testNum);
  var stats=testClass.getStatAsArray(testNum);
  console.log(stats);
  return stats;
}

function searchEncounterInDoc(name) {
  var testClass=new updateEncounter();
  var testNum=testClass.getTableByName(name);
  console.log(testNum);
  var stats=testClass.getStatAsArray(testNum);
  console.log(stats);
  return stats;
}

function test3() {
  searchCharacterInDoc("Ben");
  searchCharacterInDoc("Tom");
  searchCharacterInDoc("Bob");
}