class Taxi {
  // Taxi attributes
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; // Taxi Shell

    this.speed = 0;
    this.acceleration = 0.2; // c

    this.topSpeed = 3; // sMax
    this.friction = 0.05; // μ = F/N

    this.driver = new Driver();
  }

  // Updating the position of the taxi based on the driver's actions

  // TODO: Implement a NN to make the Taxi self-driving.

  update() {
    if (this.driver.forward) {
      this.speed += this.acceleration;
    }
    if (this.driver.reverse) {
      this.speed -= this.acceleration;
    }

    // Capping the speed of the Taxi
    if (this.speed > this.topSpeed) {
      this.speed = this.topSpeed;
    }

    if (this.speed < -this.topSpeed / 2) {
      this.speed = -this.topSpeed / 2; // In the physical world, there is no negative speed. But this is not a physics engine.
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    this.y -= this.speed;
  }

  // Illustrating the taxi
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2, // Setting the center of mass in the x-axis
      this.y - this.height / 2, // Setting the center of mass in the y-axis
      this.width,
      this.height
    );
    ctx.fill();
  }
}
