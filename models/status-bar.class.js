class StatusBar extends DrawableObjekt {
  percentage = 100;
  visible = true;

  constructor() {
    super();
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Updates the displayed percentage and refreshes the status bar image.
   * @param {number} percentage - Value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Maps the current percentage to an image array index (0–5).
   * @returns {number} Index into the images array.
   */
  resolveImageIndex() {
    const thresholds = [100, 80, 60, 40, 20];
    const index = thresholds.findIndex((t) => this.percentage >= t);
    return index === -1 ? 0 : 5 - index;
  }
}
