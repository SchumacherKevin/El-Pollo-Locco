class MoveableObjekt {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  hitpoints = 100;
  lastHit = 0;

  isAboveGround() {
    return this.y < 200;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(imagesArray) {
    let index = this.currentImage % imagesArray.length;
    let path = imagesArray[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endbosslevel1
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  iscolliding(movObj) {
    return (
      this.x + this.width > movObj.x &&
      this.y + this.height > movObj.y &&
      this.x < movObj.x + movObj.width &&
      this.y < movObj.y + movObj.height
    );
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 30;
    }
  }

  hit() {
    this.hitpoints -= 5;
    if (this.hitpoints < 0) {
      this.hitpoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    return new Date().getTime() - this.lastHit < 1000;
  }

  isDead() {
    return this.hitpoints == 0;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
}
