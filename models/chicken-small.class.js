class ChickenSmall extends MoveableObjekt {
  height = 65;
  width = 65;
  y = 405;
  groundY = 405;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };
  Images_Walk = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  Images_Dead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.Images_Walk);
    this.loadImages(this.Images_Dead);
    this.hitpoints = 20;
    this.animate();
  }

  animate() {
    this.applyChickenGravity();
    setTimeout(() => {
      setInterval(() => {
        if (!this.isDead()) this.jumpChicken();
      }, 2000);
    }, Math.random() * 2000);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.Images_Dead);
      } else {
        this.playAnimation(this.Images_Walk);
      }
    }, 1000 / 10);
  }

  jumpChicken() {
    if (this.y >= this.groundY) {
      this.speedY = 30;
    }
  }

  applyChickenGravity() {
    setInterval(() => {
      if (this.y < this.groundY || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.y >= this.groundY && this.speedY < 0) {
        this.y = this.groundY;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }
}
