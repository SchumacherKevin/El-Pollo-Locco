/** A single parallax background layer tile. */
class BackgroundObjekt extends MoveableObjekt {
  width = 720;
  height = 480;

  /**
   * @param {string} imagePath - Path to the background layer image.
   * @param {number} x - Horizontal position of this tile.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
