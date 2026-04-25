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
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.Images_Idle);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.Images_Idle.length;
      let path = this.Images_Idle[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 10);
  }
  jump() {}
}
