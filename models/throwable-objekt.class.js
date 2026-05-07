/** A salsa bottle that is thrown by the character and travels to the right. */
class ThrowableObjekt extends MoveableObjekt {
  imagesThrowBottle = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imagesBottleSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * @param {number} x - Horizontal start position.
   * @param {number} y - Vertical start position.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.y = 200;
    this.speed = 10;
    this.splashing = false;
    this.splashDone = false;
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.imagesThrowBottle);
    this.loadImages(this.imagesBottleSplash);
    this.throw();
  }

  /** Launches the bottle by applying gravity and starting horizontal movement. */
  throw() {
    this.speedY = 30;
    this.launched = false;
    this.applyGravity();
    setInterval(() => {
      if (this.y < 380) this.launched = true;
      if (this.splashing) {
        this.playAnimation(this.imagesBottleSplash);
      } else if (this.launched && this.y >= 380) {
        this.y = 380;
        this.splash();
      } else {
        this.x += this.speed;
        this.playAnimation(this.imagesThrowBottle);
      }
    }, 1000 / 25);
  }

  /** Stops the bottle, plays the splash sound and animation, then marks it as done. */
  splash() {
    this.splashing = true;
    this.currentImage = 0;
    audioHub.playAudio(AudioHub.BottleBreak);
    const duration = (this.imagesBottleSplash.length * 1000) / 25;
    setTimeout(() => { this.splashDone = true; }, duration);
  }
}
