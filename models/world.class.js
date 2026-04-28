class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusHitPoints = new StatusHitPoints();
  statusCoins = new StatusCoins();
  statusSalsaBottle = new StatusSalsaBottle();
  throwableObjekt = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkCollectables();
    this.checkThrow();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.iscolliding(enemy)) {
          if (!this.character.isHurt()) {
            this.character.hit();
            this.statusHitPoints.setPercentage(this.character.hitpoints);
          }
        }
      });
    }, 1000 / 25);
  }

  checkThrow() {
    setInterval(() => {
      if (this.keyboard.d) {
        this.throwableObjekt.push(new ThrowableObjekt(this.character.x + 50, this.character.y + 100));
        this.keyboard.d = false;
      }
    }, 1000 / 25);
  }

  checkCollectables() {
    setInterval(() => {
      this.level.collectables.forEach((collectable, index) => {
        if (this.character.iscolliding(collectable)) {
          if (collectable instanceof Coin) {
            this.statusCoins.setPercentage(this.statusCoins.percentage + 20);
            this.level.collectables.splice(index, 1);
          } else if (collectable instanceof SalsaBottle) {
            this.statusSalsaBottle.setPercentage(this.statusSalsaBottle.percentage + 20);
            this.level.collectables.splice(index, 1);
          }
        }
      });
    }, 1000 / 25);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjektToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusHitPoints);
    this.addToMap(this.statusCoins);
    this.addToMap(this.statusSalsaBottle);
    this.ctx.translate(this.camera_x, 0);

    this.addObjektToMap(this.level.clouds);
    this.addObjektToMap(this.level.enemies);
    this.addObjektToMap(this.level.collectables);
    this.addToMap(this.character);
    this.addObjektToMap(this.throwableObjekt);

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
    movObj.drawFrameOffset(this.ctx);

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
