class ChickenSmall extends MoveableObjekt {
  height = 80;
  width = 80;
  y = 390;
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
    this.x = 200 + Math.random() * 500;
    this.speed = (0.15 + Math.random() * 0.25) * 6;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.moveLeft();
      this.playAnimation(this.Images_Walk);
    }, 1000 / 10);
  }
}
