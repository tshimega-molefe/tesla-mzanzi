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

  update(jutaBorders) {
    this.#handleAcceleration();
    this.#handleRotation();
    this.#capSpeed();
    this.#applyFriction();
    this.#moveTaxi();
    this.polygon = this.#createPolygon();
    this.sensor.update(jutaBorders);
  }

  // TODO: Implement collision detection
  #createPolygon() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    points.push({
      x: this.x - Math.sin(this.angle - alpha) * radius,
      y: this.y - Math.cos(this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * radius,
      y: this.y - Math.cos(this.angle + alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius,
    });
    return points;
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
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }

    ctx.fill();

    this.sensor.draw(ctx);
  }
}
