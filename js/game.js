let canvas;
let ctx;
let character = new Charakter();
let enemies = [new Chicken(), new Chicken(), new Chicken()];
let world = new World();

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
}
