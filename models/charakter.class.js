class Charakter extends MoveableObjekt {
  height = 280;
  y = 200;
  Images_Idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  Images_Walk = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  speed = 0.3;

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.Images_Idle);
    this.loadImages(this.Images_Walk);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.otherDirection = false;
        this.moveRight();
      }
      if (this.world.keyboard.LEFT) {
        this.otherDirection = true;
        this.moveLeft();
      }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let index = this.currentImage % this.Images_Walk.length;
        let path = this.Images_Walk[index];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let index = this.currentImage % this.Images_Idle.length;
        let path = this.Images_Idle[index];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 1000 / 10);
  }

  jump() {}
}
