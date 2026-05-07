/** A normal-sized chicken enemy that walks left once the character starts moving. */
class Chicken extends MoveableObjekt {
  height = 80;
  width = 80;
  y = 390;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };
  imagesWalk = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imagesDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /** Loads images and starts the animation loop. */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesDead);
    this.hitpoints = 20;
    this.animate();
  }

  /** Starts the movement and animation interval. */
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
      } else if (this.world && this.world.character.x > 120) {
        this.moveLeft();
        this.playAnimation(this.imagesWalk);
      }
    }, 1000 / 10);
  }
}
