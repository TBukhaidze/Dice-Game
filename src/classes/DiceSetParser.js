const { Dice } = require("./Dice");
const { Validator } = require("./Validator");

class DiceSetParser {
  static parse(args) {
    const diceArrays = Validator.validateDiceSet(args);
    return diceArrays.map((arr) => new Dice(arr));
  }
}

module.exports = { DiceSetParser };
