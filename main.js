const jozi = document.getElementById("joburgCBD");
jozi.width = 200;

// Creating the JHB context for the taxi
const ctx = jozi.getContext("2d");
const juta = new Juta(jozi.width / 2, jozi.width * 0.9);
const taxi = new Taxi(juta.getLaneCenter(2), 100, 30, 50);
taxi.draw(ctx);

// Animating the movement of the Taxi
animate();

function animate() {
  taxi.update();
  jozi.height = window.innerHeight;
  juta.draw(ctx);
  taxi.draw(ctx);
  requestAnimationFrame(animate);
}
