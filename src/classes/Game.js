const readline = require("readline");
const { FairRandomGenerator } = require("./FairRandomGenerator");

class Game {
  constructor(diceSet) {
    this.diceSet = diceSet;
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async askQuestion(query) {
    return new Promise((resolve) => {
      this.readline.question(query, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async determineFirstPlayer() {
    const fairGen = new FairRandomGenerator(2);

    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1`);
    console.log(`HMAC: ${fairGen.getHmac()}`);

    let userInput = await this.askQuestion("Your guess (0 or 1): ");

    while (!["0", "1", "x", "X"].includes(userInput)) {
      userInput = await this.askQuestion("Invalid input. Try 0 or 1: ");
    }

    if (userInput.toLowerCase() === "x") {
      this.readline.close();
      process.exit(0);
    }

    const userGuess = parseInt(userInput);
    const computerValue = fairGen.getComputerValue();

    console.log(`My value was: ${computerValue}`);
    console.log(`Key: ${fairGen.getKey()}`);

    const userGoesFirst = userGuess === computerValue;
    console.log(userGoesFirst ? "You go first!" : "I go first!");
    return userGoesFirst;
  }

  async chooseDice(excludeIndex = null) {
    console.log("Choose your dice:");
    this.diceSet.forEach((dice, index) => {
      if (index !== excludeIndex) {
        console.log(`${index} - ${dice.toString()}`);
      }
    });
    console.log("X - exit");

    let input = await this.askQuestion("Your selection: ");

    while (
      input.toLowerCase() !== "x" &&
      (!/^\d+$/.test(input) ||
        parseInt(input) >= this.diceSet.length ||
        parseInt(input) === excludeIndex)
    ) {
      input = await this.askQuestion("Invalid choice. Try again: ");
    }

    if (input.toLowerCase() === "x") {
      this.readline.close();
      process.exit(0);
    }

    return parseInt(input);
  }

  async computerRoll(mod) {
    const fairGen = new FairRandomGenerator(mod);
    console.log(`Computer has selected a value from 0 to ${mod - 1}.`);
    console.log(`HMAC: ${fairGen.getHmac()}`);

    let input = await this.askQuestion(`Enter your number (0 to ${mod - 1}): `);

    while (
      input.toLowerCase() !== "x" &&
      (!/^\d+$/.test(input) || parseInt(input) < 0 || parseInt(input) >= mod)
    ) {
      input = await this.askQuestion("Invalid number. Try again: ");
    }

    if (input.toLowerCase() === "x") {
      this.readline.close();
      process.exit(0);
    }

    const userValue = parseInt(input);
    const compValue = fairGen.getComputerValue();

    console.log(`Computer value was: ${compValue}`);
    console.log(`Key: ${fairGen.getKey()}`);

    const resultIndex = (userValue + compValue) % mod;
    return resultIndex;
  }

  async userRoll(mod) {
    const fairGen = new FairRandomGenerator(mod);
    console.log(`You must now select a value from 0 to ${mod - 1}.`);
    console.log(`HMAC: ${fairGen.getHmac()}`);

    let input = await this.askQuestion(`Enter your number (0 to ${mod - 1}): `);

    while (
      input.toLowerCase() !== "x" &&
      (!/^\d+$/.test(input) || parseInt(input) < 0 || parseInt(input) >= mod)
    ) {
      input = await this.askQuestion("Invalid number. Try again: ");
    }

    if (input.toLowerCase() === "x") {
      this.readline.close();
      process.exit(0);
    }

    const userValue = parseInt(input);
    const compValue = fairGen.getComputerValue();

    console.log(`Computer value was: ${compValue}`);
    console.log(`Key: ${fairGen.getKey()}`);

    const resultIndex = (userValue + compValue) % mod;
    return resultIndex;
  }

  async play() {
    const userFirst = await this.determineFirstPlayer();

    let computerDiceIndex, userDiceIndex;
    if (userFirst) {
      userDiceIndex = await this.chooseDice();
      const options = this.diceSet
        .map((_, i) => i)
        .filter((i) => i !== userDiceIndex);
      computerDiceIndex = options[Math.floor(Math.random() * options.length)];
      console.log(
        `I choose the ${this.diceSet[computerDiceIndex].toString()} dice.`
      );
    } else {
      computerDiceIndex = Math.floor(Math.random() * this.diceSet.length);
      console.log(
        `I choose the ${this.diceSet[computerDiceIndex].toString()} dice.`
      );
      userDiceIndex = await this.chooseDice(computerDiceIndex);
    }

    const userDice = this.diceSet[userDiceIndex];
    const compDice = this.diceSet[computerDiceIndex];

    console.log(`\nIt's time for my roll.`);
    const compRollIndex = await this.computerRoll(compDice.length);
    const compRoll = compDice.getValueAt(compRollIndex);
    console.log(`My roll result is: ${compRoll}`);

    console.log(`\nIt's time for your roll.`);
    const userRollIndex = await this.userRoll(userDice.length);
    const userRoll = userDice.getValueAt(userRollIndex);
    console.log(`Your roll result is: ${userRoll}`);

    console.log(`\nResult:`);
    if (userRoll > compRoll) {
      console.log(`You win! (${userRoll} > ${compRoll})`);
    } else if (compRoll > userRoll) {
      console.log(`I win! (${compRoll} > ${userRoll})`);
    } else {
      console.log(`It's a draw! (${compRoll} == ${userRoll})`);
    }

    this.readline.close();
  }
}

module.exports = { Game };
