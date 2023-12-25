class Sensor {
  constructor(taxi) {
    this.taxi = taxi;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = []; // Readings to detect Juta Street borders
  }

  // Update the sensor readings and rays based on the current state
  update(jutaBorders, traffic) {
    this.rays = [];
    this.readings = [];

    // Iterate through the specified number of rays
    for (let i = 0; i < this.rayCount; i++) {
      // Calculate the angle for the current ray
      const rayAngle = this.#calculateRayAngle(i);

      // Calculate the start and end points of the ray
      const start = { x: this.taxi.x, y: this.taxi.y };
      const end = this.#calculateRayEnd(rayAngle);

      // Add the ray to the array
      this.rays.push([start, end]);

      // Get readings for the current ray and Juta Street borders
      this.readings.push(this.#getReadings(this.rays[i], jutaBorders, traffic));
    }
  }

  // Draw the sensor rays on the canvas
  draw(ctx) {
    // Iterate through each ray and draw it on the canvas
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }
      this.#drawRay(ctx, i, end);
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

  // Calculate the readings from the sensor
  #getReadings(ray, jutaBorders, traffic) {
    let touches = [];

    // Iterate through Juta Street borders and find intersections
    for (let i = 0; i < jutaBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        jutaBorders[i][0],
        jutaBorders[i][1]
      );
      if (touch) {
        touches.push(touch);
      }
    }

    //
    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j++) {
        const value = getIntersection(
          ray[0],
          ray[1],
          poly[j],
          poly[(j + 1) % poly.length]
        );
        if (value) {
          touches.push(value);
        }
      }
    }

    // Determine the minimum offset among touches
    if (touches.length === 0) {
      return null;
    } else {
      const offsets = touches.map((e) => e.offset);
      const minOffset = Math.min(...offsets);
      return touches.find((e) => e.offset === minOffset);
    }
  }

  // Draw the specified ray on the canvas
  #drawRay(ctx, rayIndex, end) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "yellow";
    ctx.moveTo(this.rays[rayIndex][0].x, this.rays[rayIndex][0].y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.moveTo(this.rays[rayIndex][1].x, this.rays[rayIndex][1].y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }
}
