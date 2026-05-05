class DrawableObjekt {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  deadTime = 0;

  /**
   * Loads a single image and assigns it to this.img.
   * @param {string} path - Source path of the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads all images from an array into the image cache.
   * @param {string[]} arr - Array of image source paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas at its current position.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Returns true if this object type should display debug hitboxes.
   * @returns {boolean}
   */
  hasHitbox() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endbosslevel1 ||
      this instanceof ChickenSmall
    );
  }

  /**
   * Draws the offset collision rectangle for debug purposes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrameOffset(ctx) {
    if (!this.hasHitbox()) return;
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

  /**
   * Draws the outer bounding rectangle for debug purposes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (!this.hasHitbox()) return;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Returns true if this object overlaps another object horizontally.
   * @param {DrawableObjekt} movObj - The other object to test against.
   * @returns {boolean}
   */
  collidesHorizontally(movObj) {
    const selfRight = this.x + this.width - this.offset.right;
    const otherLeft = movObj.x + movObj.offset.left;
    const selfLeft = this.x + this.offset.left;
    const otherRight = movObj.x + movObj.width - movObj.offset.right;
    return selfRight > otherLeft && selfLeft < otherRight;
  }

  /**
   * Returns true if this object overlaps another object vertically.
   * @param {DrawableObjekt} movObj - The other object to test against.
   * @returns {boolean}
   */
  collidesVertically(movObj) {
    const selfBottom = this.y + this.height - this.offset.bottom;
    const otherTop = movObj.y + movObj.offset.top;
    const selfTop = this.y + this.offset.top;
    const otherBottom = movObj.y + movObj.height - movObj.offset.bottom;
    return selfBottom > otherTop && selfTop < otherBottom;
  }

  /**
   * Returns true if this object is colliding with another object.
   * @param {DrawableObjekt} movObj - The other object to check.
   * @returns {boolean}
   */
  isColliding(movObj) {
    return this.collidesHorizontally(movObj) && this.collidesVertically(movObj);
  }

  /**
   * Returns true if this object is currently above the ground level.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObjekt) return true;
    return this.y < 200;
  }

  /**
   * Advances to the next frame in the given animation array.
   * @param {string[]} imagesArray - Ordered array of image paths for the animation.
   */
  playAnimation(imagesArray) {
    let index = this.currentImage % imagesArray.length;
    let path = imagesArray[index];
    if (this.imageCache[path]) this.img = this.imageCache[path];
    this.currentImage++;
  }

  /** Moves the object one step to the right. */
  moveRight() {
    this.x += this.speed;
  }

  /** Moves the object one step to the left. */
  moveLeft() {
    this.x -= this.speed;
  }

  /** Initiates a jump by setting the vertical speed. */
  jump() {
    if (!this.isAboveGround()) this.speedY = 30;
  }

  /**
   * Reduces hitpoints by 20 and records either a hit time or death time.
   */
  hit() {
    this.hitpoints -= 20;
    if (this.hitpoints <= 0) {
      this.hitpoints = 0;
      this.deadTime = new Date().getTime();
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Returns true if the object was hit within the last second.
   * @returns {boolean}
   */
  isHurt() {
    return new Date().getTime() - this.lastHit < 1000;
  }

  /**
   * Returns true if the object has no hitpoints remaining.
   * @returns {boolean}
   */
  isDead() {
    return this.hitpoints == 0;
  }

  /** Starts the gravity simulation interval for this object. */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isAboveGround() && this.speedY < 0) {
        this.y = 200;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }
}
