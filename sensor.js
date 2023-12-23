// Initializing the Sensor object
class Sensor {
  constructor(taxi) {
    this.taxi = taxi;
    this.rayCount = 4; // The sensor has three rays
    this.rayLength = 100; // Each sensor is 100 units long
    this.raySpread = Math.PI / 4; // We are setting the spread between rays

    this.rays = []; // The array stores the start and end positions of the rays.
  }

  update() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1)
      );

      // calculating the start and end points of the ray using trigonometric functions (Math.sin and Math.cos) and storing the ray as a line segment in the rays array.
      const start = { x: this.taxi.x, y: this.taxi.y };
      const end = {
        x: this.taxi.x - Math.sin(rayAngle) * this.rayLength,
        y: this.taxi.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    // iterating through each ray in the rays array, drawing sensors on the canvas.
    for (let i = 0; i < this.rayCount; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);

      // The yellow lines represent the rays extending from the taxi, helping visualize the sensor's field of view or detection range.
      ctx.stroke();
    }
  }
}
