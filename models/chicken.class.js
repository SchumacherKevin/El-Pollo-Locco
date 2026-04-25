class Chicken extends MoveableObjekt {
  height = 80;
  width = 80;
  y = 390;
  Images_Walk = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.Images_Walk);
    this.x = 200 + Math.random() * 500;
    this.animate();
    this.speed = 0.15 + Math.random() * 0.25;
  }

  animate() {
    setInterval(() => {
      let index = this.currentImage % this.Images_Walk.length;
      let path = this.Images_Walk[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 10);
  }
}
