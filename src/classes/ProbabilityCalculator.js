class ProbabilityCalculator {
  static calculateWinProbability(diceA, diceB) {
    let aWins = 0;
    let bWins = 0;
    let draws = 0;

    for (const a of diceA.values) {
      for (const b of diceB.values) {
        if (a > b) {
          aWins++;
        } else if (b > a) {
          bWins++;
        } else {
          draws++;
        }
      }
    }

    const total = diceA.values.length * diceB.values.length;

    return {
      aWinPercent: ((aWins / total) * 100).toFixed(2),
      bWinPercent: ((bWins / total) * 100).toFixed(2),
      drawPercent: ((draws / total) * 100).toFixed(2),
    };
  }
}

module.exports = { ProbabilityCalculator };
