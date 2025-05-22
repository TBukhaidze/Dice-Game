const { ProbabilityCalculator } = require("./ProbabilityCalculator");

class ProbabilityTable {
  constructor(diceSet) {
    this.diceSet = diceSet;
  }

  print() {
    const size = this.diceSet.length;

    console.log("\n🧮 Dice win probability table:");
    const header = ["Dice#"]
      .concat(this.diceSet.map((_, i) => `D${i}`))
      .join("\t");
    console.log(header);

    for (let i = 0; i < size; i++) {
      const row = [`D${i}`];

      for (let j = 0; j < size; j++) {
        if (i === j) {
          row.push(" — ");
        } else {
          const result = ProbabilityCalculator.calculateWinProbability(
            this.diceSet[i],
            this.diceSet[j]
          );
          row.push(`${result.aWinPercent}%`);
        }
      }

      console.log(row.join("\t"));
    }
    console.log();
  }
}

module.exports = { ProbabilityTable };
