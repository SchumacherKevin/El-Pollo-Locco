/** A decorative cloud that drifts slowly to the left. */
class Cloud extends MoveableObjekt {
  y = 20;
  height = 250;
  width = 500;

  /** @param {number} x - Horizontal start position. */
  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /** Starts the cloud drift interval. */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
