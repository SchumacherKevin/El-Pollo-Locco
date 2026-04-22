class Chicken extends MoveableObjekt {

  height = 80;
  width = 80;
  y = 390;
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
  }
}
