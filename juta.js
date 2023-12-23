// Defining Juta Street in Jozi CBD
class Juta {
  constructor(x, width, laneCount = 3) {
    this.x = x; // The center of the road
    this.width = width; // The width of Juta Street
    this.laneCount = laneCount; // How many lanes Juta Street has

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 999999999; // Length of Juta Street
    this.top = -infinity;
    this.bottom = infinity;
  }

  // Drawing the yellow boundaries of Juta Street
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";

    // Drawing the white lanes of Juta Street
    for (let i = 0; i <= this.laneCount; i++) {
      //   Linearly interpolate (LERP) to estimate the values that lie between known values. In this case between 'i' and the laneCount
      const x = lerp(this.left, this.right, i / this.laneCount);
    }

    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();
  }
}

// lerp(a,b,t)=a+t⋅(b−a)

function lerp(A, B, t) {
  // Linearly interpolates between values A and B at percentage 't' along the range.
  return A + (B - A) * t;
}
