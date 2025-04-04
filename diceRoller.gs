// Function to roll the dice on the server-side (Google Apps Script)
function rollDice(diceNumber, sideNumber, lowestNumber, greatestNumber) {
  var results = [];

  // Roll each die
  for (var i = 0; i < diceNumber; i++) {
    // Roll a die (random value between lowestNumber and greatestNumber)
    var rollResult = Math.floor(Math.random() * (greatestNumber - lowestNumber + 1)) + lowestNumber;
    results.push(rollResult);
  }

  // Return the results to the client-side
  return results;
}