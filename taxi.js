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

    this.angle = 0; // Heading Angle

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

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1; // Prevents all rotation when stationary, and gives the Taxi correct motion in reverse.

      if (this.driver.left) {
        this.angle += 0.03 * flip; // Increase by degrees on Unit Circle
      }

      if (this.driver.right) {
        this.angle -= 0.03 * flip; // Decrease by degrees on Unit Circle
      }
    }

    // Capping the speed of the Taxi
    if (this.speed > this.topSpeed) {
      this.speed = this.topSpeed;
    }

    if (this.speed < -this.topSpeed / 2) {
      this.speed = -this.topSpeed / 2; // In the physical world, there is no negative speed. But this is not a physics engine (Yet).
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // Taxi moves in direction of heading
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  // Illustrating the taxi
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(
      -this.width / 2, // Setting the center of mass in the x-axis
      -this.height / 2, // Setting the center of mass in the y-axis
      this.width,
      this.height
    );
    ctx.fill();

    ctx.restore(); // Avoid infinite rotations
  }
}
