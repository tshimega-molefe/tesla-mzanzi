/**
 * Class representing a visualizer for neural network structure and connections.
 */
class Visualizer {
  /**
   * Draw the neural network on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {NeuralNetwork} network - The neural network to visualize.
   */
  static drawNetwork(ctx, network) {
    // Margin and dimensions for drawing
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    // Height of each level
    const levelHeight = height / network.levels.length;

    // Draw each level of the neural network
    for (let i = network.levels.length - 1; i >= 0; i--) {
      const levelTop =
        top +
        lerp(
          height - levelHeight,
          0,
          network.levels.length == 1 ? 0.5 : i / (network.levels.length - 1)
        );

      // Set dashed line for connections
      ctx.setLineDash([7, 3]);
      // Draw the current level
      Visualizer.drawLevel(
        ctx,
        network.levels[i],
        left,
        levelTop,
        width,
        levelHeight,
        i == network.levels.length - 1 ? ["⬆", "⬅", "➡", "⬇"] : []
      );
    }
  }

  /**
   * Draw a single level of the neural network.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {Level} level - The level to draw.
   * @param {number} left - Left coordinate of the level.
   * @param {number} top - Top coordinate of the level.
   * @param {number} width - Width of the level.
   * @param {number} height - Height of the level.
   * @param {string[]} outputLabels - Labels for the output nodes.
   */
  static drawLevel(ctx, level, left, top, width, height, outputLabels) {
    const right = left + width;
    const bottom = top + height;

    // Extract properties from the level
    const { inputs, outputs, weights, biases } = level;

    // Draw connections between nodes
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.#getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.#getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        ctx.strokeStyle = getRGBA(weights[i][j]);
        ctx.stroke();
      }
    }

    // Draw input nodes
    const nodeRadius = 18;
    for (let i = 0; i < inputs.length; i++) {
      const x = Visualizer.#getNodeX(inputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = getRGBA(inputs[i]);
      ctx.fill();
    }

    // Draw output nodes
    for (let i = 0; i < outputs.length; i++) {
      const x = Visualizer.#getNodeX(outputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = getRGBA(outputs[i]);
      ctx.fill();

      // Draw bias connections
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = getRGBA(biases[i]);
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw output labels
      if (outputLabels[i]) {
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.font = nodeRadius * 1.5 + "px Arial";
        ctx.fillText(outputLabels[i], x, top + nodeRadius * 0.1);
        ctx.lineWidth = 0.5;
        ctx.strokeText(outputLabels[i], x, top + nodeRadius * 0.1);
      }
    }
  }

  /**
   * Get the x-coordinate of a node.
   * @private
   * @param {number[]} nodes - Array of nodes.
   * @param {number} index - Index of the current node.
   * @param {number} left - Left coordinate.
   * @param {number} right - Right coordinate.
   * @returns {number} - The x-coordinate of the node.
   */
  static #getNodeX(nodes, index, left, right) {
    return lerp(
      left,
      right,
      nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
    );
  }
}
