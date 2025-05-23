class Dice {
  constructor(values) {
    this.values = values;
  }

  getValueAt(index) {
    return this.values[index];
  }

  get length() {
    return this.values.length;
  }

  toString() {
    return `[${this.values.join(", ")}]`;
  }
}

module.exports = { Dice };