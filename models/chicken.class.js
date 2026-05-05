class Chicken extends MoveableObjekt {
  height = 80;
  width = 80;
  y = 390;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };
  Images_Walk = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  Images_Dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.Images_Walk);
    this.loadImages(this.Images_Dead);
    this.hitpoints = 20;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.Images_Dead);
      } else if (this.world && this.world.character.x > 120) {
        this.moveLeft();
        this.playAnimation(this.Images_Walk);
      } else {
        this.playAnimation(this.Images_Walk);
      }
    }, 1000 / 10);
  }
}
