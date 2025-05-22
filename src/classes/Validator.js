class Validator {
  static isValidDice(values) {
    return (
      Array.isArray(values) &&
      values.length > 0 &&
      values.every((v) => Number.isInteger(v) && v > 0)
    );
  }

  static validateDiceSet(diceStrings) {
    if (diceStrings.length < 3) {
      throw new Error("You must provide at least 3 dice.");
    }

    const diceSet = diceStrings.map((str) => {
      const values = str.split(",").map(Number);
      if (!Validator.isValidDice(values)) {
        throw new Error(`Invalid dice: ${str}`);
      }
      return values;
    });

    const diceLength = diceSet[0].length;
    if (!diceSet.every((dice) => dice.length === diceLength)) {
      throw new Error("All dice must have the same number of sides.");
    }

    return diceSet;
  }
}

module.exports = { Validator };
