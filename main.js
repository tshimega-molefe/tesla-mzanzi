const jozi = document.getElementById("joburgCBD");
jozi.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Creating the JHB context for the taxi
const ctx = jozi.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const juta = new Juta(jozi.width / 2, jozi.width * 0.9);
const taxi = new Taxi(juta.getLaneCenter(1), 100, 30, 50, "AI", 2.6);
const traffic = [new Taxi(juta.getLaneCenter(1), -100, 30, 50, "DUMMY", 2.2)];

// Animating the movement of the Taxi
animate();

function animate() {
  // Code for updating and drawing each Taxi in the traffic array
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(juta.borders, []);
  }
  taxi.update(juta.borders, traffic);

  jozi.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -taxi.y + jozi.height * 0.7);

  juta.draw(ctx);
  // Drawing each Taxi in the traffic array
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "orange");
  }
  taxi.draw(ctx, "black");

  ctx.restore();

  Visualizer.drawNetwork(networkCtx, taxi.brain);

  requestAnimationFrame(animate);
}
