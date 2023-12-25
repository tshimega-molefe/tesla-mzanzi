/**
 * Class representing a neural network with multiple levels.
 */
class NeuralNetwork {
  /**
   * Constructor for the NeuralNetwork class.
   * @param {number[]} neuronCounts - Array specifying the number of neurons in each level.
   */
  constructor(neuronCounts) {
    // Array to store different levels of the neural network
    this.levels = [];

    // Creating individual levels with specified neuron counts
    for (let i = 0; i < neuronCounts.length; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  /**
   * Static method to perform feedforward operation on the neural network.
   * @param {number[]} givenInputs - Array of input values.
   * @param {NeuralNetwork} network - The neural network instance.
   * @returns {number[]} - Array of output values.
   */
  static feedForward(givenInputs, network) {
    // Initialize outputs with the first level's feedforward result
    let outputs = Level.feedForward(givenInputs, network.levels[0]);

    // Iterate through the rest of the levels for feedforwarding
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }

    // Return the final output values
    return outputs;
  }
}

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

  /**
   * Perform a feedforward operation on the given inputs.
   * @param {number[]} givenInputs - Array of input values.
   * @param {Level} level - The Level instance to perform feedforward on.
   * @returns {number[]} - Array of output values.
   */
  static feedForward(givenInputs, level) {
    // Feedforward input neurons
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i].feedForward(givenInputs[i]);
    }

    // Feedforward output neurons
    for (let i = 0; i < level.outputs.length; i++) {
      let weightedSum = 0;

      // Calculate the weighted sum
      for (let j = 0; j < level.inputs.length; j++) {
        weightedSum += level.inputs[j] * level.weights[j][i];
      }

      // Apply activation function (simple threshold)
      level.outputs[i] = weightedSum > level.biases[i] ? 1 : 0;
    }

    return level.outputs;
  }
}

/**
 * Class representing a neural network input neuron.
 * 
 * Initialization:

The method receives givenInputs, which represents the input values to the neural network for a particular instance.
The method takes a level parameter, which represents the current neural network level (layer) for which the feedforward operation is performed.
Input Neurons:

The method iterates over each input neuron in the level.
For each input neuron, it calls the feedForward method on the neuron, passing the corresponding input value from givenInputs.
Weighted Sum Calculation:

After the input neurons have processed the input values, the method proceeds to calculate the weighted sum for each output neuron.
It iterates over each output neuron and, for each, iterates over the input neurons to calculate the weighted sum.
The weighted sum (sum) is computed as the sum of the product of each input value and its corresponding weight.
Activation Function:

The method checks whether the calculated sum is greater than the bias associated with the output neuron.
If the sum is greater than the bias, the output of the neuron is set to 1.
If the sum is not greater than the bias, the output is set to 0.
This step represents a simple threshold activation function.
Output Update:

The method updates the output values for each output neuron based on the activation function's result.
Return Output Values:

Finally, the method returns the updated output values of the level, which represent the network's output for the given inputs.
In summary, the feedforward operation involves propagating input values through the network, calculating weighted sums, applying an activation function, and obtaining the final output values. This process is crucial for the network's ability to make predictions or classifications based on input data.
 * 
 */
