// Defining Juta Street in Jozi CBD
class Juta {
  constructor(x, width, laneCount = 4) {
    this.x = x; // The center of the road
    this.width = width; // The width of Juta Street
    this.laneCount = laneCount; // How many lanes Juta Street has

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 10000000; // Length of Juta Street
    this.top = -infinity;
    this.bottom = infinity;
  }
  // Find the center of a lane
  getLaneCenter(laneIndex) {
    // left -> right '0 | 1 | 2 | 3'
    const laneWidth = this.width / this.laneCount;
    return this.left + laneWidth / 2 + laneIndex * laneWidth;
  }

  // Drawing the white boundaries of Juta Street
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Drawing the white lanes of Juta Street
    for (let i = 0; i <= this.laneCount; i++) {
      //   Linearly interpolate (LERP) to estimate the values that lie between known values. In this case between 'i' and the laneCount
      const x = lerp(this.left, this.right, i / this.laneCount);

      if (i > 0 && i < this.laneCount) {
        ctx.setLineDash([20, 20]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
