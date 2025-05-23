const { ProbabilityCalculator } = require("./ProbabilityCalculator");
const Table = require("cli-table3");

class ProbabilityTable {
  constructor(diceSet) {
    this.diceSet = diceSet;
  }

  print() {
    const size = this.diceSet.length;

    console.log("\n🧮 Dice win probability table:");

    const table = new Table({
      head: ["Dice#", ...this.diceSet.map((_, i) => `D${i}`)],
      colAligns: ["center", ...Array(size).fill("center")],
    });

    for (let i = 0; i < size; i++) {
      const row = [`D${i}`];

      for (let j = 0; j < size; j++) {
        if (i === j) {
          row.push("—");
        } else {
          const result = ProbabilityCalculator.calculateWinProbability(
            this.diceSet[i],
            this.diceSet[j]
          );
          row.push(`${result.aWinPercent}%`);
        }
      }

      table.push(row);
    }

    console.log(table.toString());
    console.log();
  }
}

module.exports = { ProbabilityTable };