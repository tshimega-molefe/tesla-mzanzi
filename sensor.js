class Sensor {
  constructor(taxi) {
    this.taxi = taxi;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI / 2;

    this.rays = [];
  }

  update() {
    this.rays = [];

    // Iterate through the specified number of rays
    for (let i = 0; i < this.rayCount; i++) {
      // Calculate the angle for the current ray
      const rayAngle = this.#calculateRayAngle(i);

      // Calculate the start and end points of the ray
      const start = { x: this.taxi.x, y: this.taxi.y };
      const end = this.#calculateRayEnd(rayAngle);

      // Add the ray to the array
      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    // Iterate through each ray and draw it on the canvas
    for (let i = 0; i < this.rayCount; i++) {
      this.#drawRay(ctx, i);
    }
  }

  // Calculate the angle for the current ray
  #calculateRayAngle(rayIndex) {
    return (
      lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        this.rayCount === 1 ? 0.5 : rayIndex / (this.rayCount - 1)
      ) + this.taxi.angle
    );
  }

  // Calculate the end point of the ray based on its angle
  #calculateRayEnd(rayAngle) {
    return {
      x: this.taxi.x - Math.sin(rayAngle) * this.rayLength,
      y: this.taxi.y - Math.cos(rayAngle) * this.rayLength,
    };
  }

  // Draw the specified ray on the canvas
  #drawRay(ctx, rayIndex) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "yellow";
    ctx.moveTo(this.rays[rayIndex][0].x, this.rays[rayIndex][0].y);
    ctx.lineTo(this.rays[rayIndex][1].x, this.rays[rayIndex][1].y);
    ctx.stroke();
  }
}
