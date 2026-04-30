class SalsaBottle extends Collectables {
  Images_Bottle = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  Images_Bottle_OnGround = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y+20;
    this.width = 100;
    this.height = 100;
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.Images_Bottle);
    this.loadImages(this.Images_Bottle_OnGround);
  }

}
