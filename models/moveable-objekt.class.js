class MoveableObjekt extends DrawableObjekt {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  hitpoints = 100;
  lastHit = 0;
  offset = { top: 0, right: 0, bottom: 0, left: 0 };

  isAboveGround() {
    if (this instanceof ThrowableObjekt) {
      return true;
    } else {
      return this.y < 200;
    }
  }

  playAnimation(imagesArray) {
    let index = this.currentImage % imagesArray.length;
    let path = imagesArray[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  iscolliding(movObj) {
    return (
      this.x +
        this.offset.left +
        this.width -
        this.offset.right -
        this.offset.left >
        movObj.x + movObj.offset.left &&
      this.y +
        this.offset.top +
        this.height -
        this.offset.bottom -
        this.offset.top >
        movObj.y + movObj.offset.top &&
      this.x + this.offset.left <
        movObj.x +
          movObj.offset.left +
          movObj.width -
          movObj.offset.right -
          movObj.offset.left &&
      this.y + this.offset.top <
        movObj.y +
          movObj.offset.top +
          movObj.height -
          movObj.offset.bottom -
          movObj.offset.top
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
    this.hitpoints -= 20;
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
