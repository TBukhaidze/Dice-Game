const { DiceSetParser } = require("./classes/DiceSetParser");
const { Game } = require("./classes/Game");
const { ProbabilityTable } = require("./classes/ProbabilityTable");

try {
  const args = process.argv.slice(2);
  const diceSet = DiceSetParser.parse(args);

  const table = new ProbabilityTable(diceSet);
  table.print();

  const game = new Game(diceSet);
  game.play();
} catch (err) {
  console.error("Error:", err.message);
  console.log("Usage: node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
  process.exit(1);
}
