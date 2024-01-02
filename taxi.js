class Taxi {
  constructor(x, y, width, height, driverType, topSpeed = 3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.topSpeed = topSpeed;
    this.friction = 0.05;

    this.angle = 0;

    this.damaged = false;

    this.useBrain = driverType === "AI";

    if (driverType !== "DUMMY") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }

    this.driver = new Driver(driverType);
  }

  update(jutaBorders, traffic) {
    // Write-off the taxi in the event of a collision.
    if (!this.damaged) {
      this.#handleAcceleration();
      this.#handleRotation();
      this.#capSpeed();
      this.#applyFriction();
      this.#moveTaxi();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(jutaBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(jutaBorders, traffic);
      const offsets = this.sensor.readings.map((s) =>
        s === null ? 0 : 1 - s.offset
      );
      const outputs = NeuralNetwork.feedForward(offsets, this.brain);
      console.log(outputs);

      if (this.useBrain) {
        this.driver.forward = outputs[0];
        this.driver.left = outputs[1];
        this.driver.right = outputs[2];
        this.driver.reverse = outputs[3];
      }
    }
  }

  #assessDamage(jutaBorders, traffic) {
    for (let i = 0; i < jutaBorders.length; i++) {
      if (polysIntersect(this.polygon, jutaBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    const addPoint = (angle) => ({
      x: this.x - Math.sin(angle) * radius,
      y: this.y - Math.cos(angle) * radius,
    });

    points.push(addPoint(this.angle - alpha));
    points.push(addPoint(this.angle + alpha));
    points.push(addPoint(Math.PI + this.angle - alpha));
    points.push(addPoint(Math.PI + this.angle + alpha));

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

  draw(ctx, color, drawSensor = false) {
    if (this.damaged) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }

    ctx.fill();
    if (this.sensor && drawSensor) {
      this.sensor.draw(ctx);
    }
  }
}
