class SalsaBottle extends Collectables {

  imagesBottleOnGround = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  offset = { top: 25, right: 25, bottom: 25, left: 25 };

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
    this.loadImages(this.imagesBottleOnGround);
  }
}
