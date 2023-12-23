const jozi = document.getElementById("joburgCBD");
jozi.width = 200;

// Creating the JHB context for the taxi
const ctx = jozi.getContext("2d");
const taxi = new Taxi(100, 100, 30, 50);
taxi.draw(ctx);

// Animating the movement of the Taxi
animate();

function animate() {
  taxi.update();
  jozi.height = window.innerHeight;
  taxi.draw(ctx);
  requestAnimationFrame(animate);
}
