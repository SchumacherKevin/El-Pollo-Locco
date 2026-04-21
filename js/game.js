let canvas;
let character = new Charakter();
let enemies = [new Chicken(), new Chicken(), new Chicken()];
let world;

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  world = new World(canvas);
}
