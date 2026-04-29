class DrawableObjekt {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrameOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endbosslevel1 ||
      this instanceof ChickenSmall
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top,
      );
      ctx.stroke();
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endbosslevel1 ||
      this instanceof ChickenSmall
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
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
