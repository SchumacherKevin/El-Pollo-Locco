class Endbosslevel1 extends MoveableObjekt {
  height = 400;
  width = 400;
  y = 80;
  Images_Walk = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  offset = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.Images_Walk);
    this.x = 2000;
    this.speed = 5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.playAnimation(this.Images_Walk);
    }, 1000 / 10);
  }
}
