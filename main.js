const jozi = document.getElementById("joburgCBD");
jozi.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Creating the JHB context for the taxi
const ctx = jozi.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const juta = new Juta(jozi.width / 2, jozi.width * 0.9);

const N = 300;
const taxis = generateTaxis(N);
let bestTaxi = taxis[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < taxis.length; i++) {
    taxis[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(taxis[i].brain, 0.1);
    }
  }
}

const traffic = [
  new Taxi(juta.getLaneCenter(1), -100, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(0), -300, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(2), -300, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(0), -500, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(1), -500, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(1), -700, 30, 50, "DUMMY", 2.2),
  new Taxi(juta.getLaneCenter(2), -700, 30, 50, "DUMMY", 2.2),
];

// Animating the movement of the Taxi
animate();

// Saving the most successful generation
function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestTaxi.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

// Generating Taxi's
function generateTaxis(N) {
  const taxis = [];
  for (let i = 1; i <= N; i++) {
    taxis.push(new Taxi(juta.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return taxis;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(juta.borders, []);
  }
  for (let i = 0; i < taxis.length; i++) {
    taxis[i].update(juta.borders, traffic);
  }

  // Fitness function
  bestTaxi = taxis.find((t) => t.y == Math.min(...taxis.map((t) => t.y)));

  jozi.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -bestTaxi.y + jozi.height * 0.7);

  juta.draw(ctx);
  // Drawing each Taxi in the traffic array
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "orange");
  }

  ctx.globalAlpha = 0.2;
  for (let i = 0; i < taxis.length; i++) {
    taxis[i].draw(ctx, "black");
  }

  ctx.globalAlpha = 1;
  bestTaxi.draw(ctx, "black", true);

  ctx.restore();

  networkCtx.lineDashOffset = -time / 50;

  Visualizer.drawNetwork(networkCtx, bestTaxi.brain);

  requestAnimationFrame(animate);
}
