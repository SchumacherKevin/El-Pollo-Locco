class Coin extends Collectables {
  imagesCoin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  };

  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.imagesCoin);
    this.animate();
  }

  /** Starts the spinning animation interval. */
  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesCoin);
    }, 1000 / 5);
  }
}
