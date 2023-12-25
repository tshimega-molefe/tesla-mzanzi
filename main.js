const jozi = document.getElementById("joburgCBD");
jozi.width = 200;

// Creating the JHB context for the taxi
const ctx = jozi.getContext("2d");
const juta = new Juta(jozi.width / 2, jozi.width * 0.9);
const taxi = new Taxi(juta.getLaneCenter(1), 100, 30, 50, "HUMAN", 3.5);
const traffic = [new Taxi(juta.getLaneCenter(1), -100, 30, 50, "AI", 2.2)];

// Animating the movement of the Taxi
animate();

function animate() {
  // Code for updating and drawing each Taxi in the traffic array
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(juta.borders, []);
  }
  taxi.update(juta.borders, traffic);

  jozi.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -taxi.y + jozi.height * 0.7);

  juta.draw(ctx);
  // Drawing each Taxi in the traffic array
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  taxi.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate);
}
