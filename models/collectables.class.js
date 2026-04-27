class Collectables extends DrawableObjekt {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.iscolliding();
  }
}
