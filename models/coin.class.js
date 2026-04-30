class Coin extends Collectables {
  Images_Coin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.Images_Coin);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.Images_Coin);
    }, 1000 / 5);
  }
}
