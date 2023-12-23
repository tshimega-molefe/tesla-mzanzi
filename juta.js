// Defining Juta Street in Jozi CBD
class Juta {
  constructor(x, width, laneCount = 3) {
    this.x = x; // The center of the road
    this.width = width; // The width of Juta Street
    this.laneCount = laneCount; // How many lanes Juta Street has

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 10000000; // Length of Juta Street
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }
  // Find the center of a lane
  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;

    // Ensure that laneIndex is within the valid range
    const clampedLaneIndex = Math.max(
      0,
      Math.min(laneIndex, this.laneCount - 1)
    );

    return this.left + laneWidth / 2 + clampedLaneIndex * laneWidth;
  }

  // Drawing the white boundaries of Juta Street
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Drawing the white lanes of Juta Street
    for (let i = 1; i <= this.laneCount - 1; i++) {
      //   Linearly interpolate (LERP) to estimate the values that lie between known values. In this case between 'i' and the laneCount
      const x = lerp(this.left, this.right, i / this.laneCount);

      ctx.setLineDash([20, 20]);

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
