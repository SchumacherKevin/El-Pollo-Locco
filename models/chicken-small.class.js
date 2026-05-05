class ChickenSmall extends MoveableObjekt {
  height = 65;
  width = 65;
  y = 405;
  groundY = 405;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };
  isThrown = false;
  throwSpeedX = 0;
  walksAfterThrow = false;
  imagesWalk = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  imagesDead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesDead);
    this.hitpoints = 20;
    this.animate();
  }

  /**
   * Launches this chicken as a projectile from the given position.
   * @param {number} x - Starting x position.
   * @param {number} y - Starting y position.
   */
  launch(x, y) {
    this.x = x;
    this.y = y;
    this.isThrown = true;
    this.walksAfterThrow = true;
    this.throwSpeedX = -(10 + Math.random() * 5);
    this.speedY = 15 + Math.random() * 8;
  }

  /** Starts the jump interval and animation loop. */
  animate() {
    this.applyChickenGravity();
    setTimeout(() => {
      setInterval(() => {
        if (!this.isDead() && !this.isThrown) this.jumpChicken();
      }, 2000);
    }, Math.random() * 2000);
    setInterval(() => {
      this.playAnimation(this.isDead() ? this.imagesDead : this.imagesWalk);
    }, 1000 / 10);
  }

  /** Triggers a jump if the chicken is on the ground. */
  jumpChicken() {
    if (this.y >= this.groundY) this.speedY = 30;
  }

  /** Resets state when the chicken lands after being thrown or jumping. */
  landChicken() {
    this.y = this.groundY;
    this.speedY = 0;
    this.isThrown = false;
    this.throwSpeedX = 0;
  }

  /** Processes one gravity tick: applies vertical movement and horizontal throw travel. */
  gravityTick() {
    if (this.y < this.groundY || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
    if (this.y >= this.groundY && this.speedY < 0) this.landChicken();
    if (this.isThrown) {
      this.x += this.throwSpeedX;
    } else if (this.walksAfterThrow && !this.isDead()) {
      this.moveLeft();
    }
  }

  /** Starts the gravity simulation interval for this chicken. */
  applyChickenGravity() {
    setInterval(() => this.gravityTick(), 1000 / 25);
  }
}
