class Taxi {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.topSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;

    this.sensor = new Sensor(this);

    this.driver = new Driver();
  }

  update() {
    this.#handleAcceleration();
    this.#handleRotation();
    this.#capSpeed();
    this.#applyFriction();
    this.#moveTaxi();
    this.sensor.update();
  }

  #handleAcceleration() {
    if (this.driver.forward) {
      this.speed += this.acceleration;
    }
    if (this.driver.reverse) {
      this.speed -= this.acceleration;
    }
  }

  #handleRotation() {
    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.driver.left) {
        this.angle += 0.03 * flip;
      }
      if (this.driver.right) {
        this.angle -= 0.03 * flip;
      }
    }
  }

  #capSpeed() {
    if (this.speed > this.topSpeed) {
      this.speed = this.topSpeed;
    }
    if (this.speed < -this.topSpeed / 2) {
      this.speed = -this.topSpeed / 2;
    }
  }

  #applyFriction() {
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
  }

  #moveTaxi() {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}
