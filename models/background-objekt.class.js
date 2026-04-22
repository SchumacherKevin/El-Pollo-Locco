class BackgroundObjekt extends MoveableObjekt {
  width = 720;
  constructor(imagePath, x, height) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - height;
    this.height = height;
  }
}
