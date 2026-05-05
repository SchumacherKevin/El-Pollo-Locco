class SalsaBottle extends Collectables {
  imagesBottle = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imagesBottleOnGround = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y + 20;
    this.width = 100;
    this.height = 100;
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.imagesBottle);
    this.loadImages(this.imagesBottleOnGround);
  }
}
