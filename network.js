/**
 * Class representing a neural network level with specified input and output counts.
 */
class Level {
  /**
   * Constructor for the Level class.
   * @param {number} inputCount - Number of input neurons.
   * @param {number} outputCount - Number of output neurons.
   */
  constructor(inputCount, outputCount) {
    // Arrays to store inputs, outputs, biases, and weights
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];
    // Initializing a 2D array for weights
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    // Randomizing initial weights and biases
    Level.#randomize(this);
  }

  /**
   * Private static method to randomize weights for a given level.
   * @param {Level} level - The Level instance to randomize.
   */
  static #randomize(level) {
    // Loop through inputs and outputs to set random weights
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        // Randomizing weights between -1 and 1
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
      // Randomizing biases between -1 and 1
      level.biases[i] = Math.random() * 2 - 1;
    }
  }
}
