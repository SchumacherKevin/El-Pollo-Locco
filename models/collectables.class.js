/** Base class for all collectable items placed in the level. */
class Collectables extends DrawableObjekt {
  offset = { top: 0, right: 0, bottom: 0, left: 0 };

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
  }
}
