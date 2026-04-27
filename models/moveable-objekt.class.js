class MoveableObjekt extends DrawableObjekt {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  hitpoints = 100;
  lastHit = 0;

  isAboveGround() {
    return this.y < 200;
  }

  playAnimation(imagesArray) {
    let index = this.currentImage % imagesArray.length;
    let path = imagesArray[index];
    this.img = this.imageCache[path];
    this.currentImage++;
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
