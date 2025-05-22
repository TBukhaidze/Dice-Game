const crypto = require("crypto");

class FairRandomGenerator {
  constructor(range) {
    this.range = range;
    this.secretKey = crypto.randomBytes(32).toString("hex"); 
    this.computerValue = FairRandomGenerator.generateUniform(range);

    this.hmac = crypto
      .createHmac("sha3-256", this.secretKey)
      .update(String(this.computerValue))
      .digest("hex");
  }

  static generateUniform(range) {
    const max = 256;
    const randByte = () => crypto.randomBytes(1)[0];
    let val;
    do {
      val = randByte();
    } while (val >= max - (max % range));
    return val % range;
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
