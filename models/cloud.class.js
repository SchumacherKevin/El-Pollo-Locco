/** A decorative cloud that drifts slowly to the left. */
class Cloud extends MoveableObjekt {
  y = 20;
  height = 250;
  width = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 20 + Math.random() * 500;
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
