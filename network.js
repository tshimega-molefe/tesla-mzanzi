class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];

    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);

    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }

    return outputs;
  }

  /**
   * Mutate the neural network by adjusting biases and weights.
   *
   * @param {NeuralNetwork} network - The neural network to mutate.
   * @param {number} amount - The magnitude of mutation, where a higher amount results in more significant changes (default is 1).
   *
   * Mutation Process:
   * - The method iterates through each level in the neural network.
   * - For each level, it adjusts the biases by applying linear interpolation (lerp) to gradually change each bias towards a random value between -1 and 1.
   * - It also adjusts the weights in a similar manner. For each weight, lerp is applied to gradually change it towards a random value between -1 and 1.
   *
   * Magnitude of Mutation:
   * - The amount parameter controls the magnitude of mutation. A higher amount leads to more significant changes in biases and weights.
   *
   * Rationale:
   * - Mutation is a crucial step in the evolutionary process of neural networks. It introduces diversity in the population, allowing for exploration of different solutions.
   * - The use of linear interpolation ensures a gradual change, preventing drastic alterations that may lead to the loss of useful information learned by the network.
   * - The random values between -1 and 1 add stochasticity, promoting exploration of different regions in the solution space.
   */
  static mutate(network, amount = 1) {
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = lerp(
            level.weights[i][j],
            Math.random() * 2 - 1,
            amount
          );
        }
      }
    });
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }

    Level.#randomize(this);
  }

  static #randomize(level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < level.outputs.length; i++) {
      let weightedSum = 0;

      for (let j = 0; j < level.inputs.length; j++) {
        weightedSum += level.inputs[j] * level.weights[j][i];
      }

      if (weightedSum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
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
**/
