const crypto = require("crypto");

class FairRandomGenerator {
  constructor(range) {
    if (typeof range !== "number" || range < 1 || !Number.isInteger(range)) {
      throw new Error("Invalid range: must be a positive integer.");
    }

    this.range = range;
    this.secretKey = crypto.randomBytes(32).toString("hex");
    this.computerValue = crypto.randomInt(range);

    this.hmac = crypto
      .createHmac("sha3-256", this.secretKey)
      .update(String(this.computerValue))
      .digest("hex");
  }

  getHmac() {
    return this.hmac;
  }

  getComputerValue() {
    return this.computerValue;
  }

  getKey() {
    return this.secretKey;
  }

  getResult(userValue) {
    return (this.computerValue + userValue) % this.range;
  }
}

module.exports = { FairRandomGenerator };
