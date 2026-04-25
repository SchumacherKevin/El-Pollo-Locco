class World {
  character = new Charakter();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObjekt("img/5_background/layers/air.png", 0),
    new BackgroundObjekt("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjekt("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjekt("img/5_background/layers/1_first_layer/1.png", 0),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjektToMap(this.backgroundObjects);
    this.addObjektToMap(this.clouds);
    this.addObjektToMap(this.enemies);
    this.addToMap(this.character);

    requestAnimationFrame(() => this.draw());
  }

  addObjektToMap(obj) {
    obj.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movObj) {
    if (movObj.otherDirection) {
      this.flipImage(movObj);
    }
    this.ctx.drawImage(
      movObj.img,
      movObj.x,
      movObj.y,
      movObj.width,
      movObj.height,
    );
    if (movObj.otherDirection) {
      this.flipImageBack(movObj);
    }
  }

  flipImage(movObj) {
    this.ctx.save();
    this.ctx.translate(movObj.width, 0);
    this.ctx.scale(-1, 1);
    movObj.x = movObj.x * -1;
  }

  flipImageBack(movObj) {
    movObj.x = movObj.x * -1;
    this.ctx.restore();
  }
}
