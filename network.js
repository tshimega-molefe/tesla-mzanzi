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
