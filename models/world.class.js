class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.iscolliding(enemy)) {
          console.log("Collison with Enemy");
        }
      });
    }, 1000 / 25);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjektToMap(this.level.backgroundObjects);
    this.addObjektToMap(this.level.clouds);
    this.addObjektToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

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

    movObj.draw(this.ctx);
    movObj.drawFrame(this.ctx);

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
