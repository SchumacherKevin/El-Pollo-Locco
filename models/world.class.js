class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusHitPoints = new StatusHitPoints();
  statusCoins = new StatusCoins();
  statusSalsaBottle = new StatusSalsaBottle();
  statusEndboss = new StatusbarEndboss();
  throwableObjekt = [];
  gameOver = false;
  coinCount = 0;
  bottleCount = 0;

  /**
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusEndboss.visible = false;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkCollectables();
    this.checkThrow();
    this.checkGameOver();
  }

  /** Assigns the world reference to the character and all enemies. */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /** Starts the collision detection interval. */
  checkCollisions() {
    setInterval(() => this.checkCollisionsTick(), 1000 / 25);
  }

  /** Processes all character-enemy and bottle-enemy collisions for one tick. */
  checkCollisionsTick() {
    const wasFalling = this.character.isAboveGround() && this.character.speedY < 0;
    this.handleEnemyCollisions(wasFalling);
    this.handleBottleCollisions();
  }

  /**
   * Iterates enemies and handles collisions with the character.
   * @param {boolean} wasFalling - Whether the character was falling this tick.
   */
  handleEnemyCollisions(wasFalling) {
    this.level.enemies.forEach((enemy, index) => {
      if (!enemy.isDead() && this.character.isColliding(enemy)) {
        this.handleSingleEnemyCollision(enemy, wasFalling);
      }
      this.removeDeadEnemy(enemy, index);
    });
  }

  /**
   * Resolves a collision between the character and one enemy.
   * @param {MoveableObjekt} enemy - The enemy being collided with.
   * @param {boolean} wasFalling - Whether the character was falling.
   */
  handleSingleEnemyCollision(enemy, wasFalling) {
    const charBottom = this.character.y + this.character.height - this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;
    if (wasFalling && charBottom <= enemyTop + 30) {
      this.handleStompCollision(enemy);
    } else if (!this.character.isHurt()) {
      this.character.hit();
      this.statusHitPoints.setPercentage(this.character.hitpoints);
    }
  }

  /**
   * Handles the character stomping an enemy from above.
   * @param {MoveableObjekt} enemy - The enemy being stomped.
   */
  handleStompCollision(enemy) {
    enemy.hit();
    if (enemy.isDead()) this.playChickenDeadSound(enemy);
    if (enemy instanceof Endbosslevel1) this.updateEndbossStatus(enemy);
    this.character.speedY = 15;
  }

  /**
   * Plays the appropriate death sound for a chicken type.
   * @param {MoveableObjekt} enemy - The dead enemy.
   */
  playChickenDeadSound(enemy) {
    if (enemy instanceof ChickenSmall) audioHub.playAudio(AudioHub.ChickenDead2);
    else if (enemy instanceof Chicken) audioHub.playAudio(AudioHub.ChickenDead);
  }

  /**
   * Updates the endboss status bar percentage.
   * @param {Endbosslevel1} enemy - The endboss.
   */
  updateEndbossStatus(enemy) {
    this.statusEndboss.setPercentage((enemy.hitpoints / 200) * 100);
  }

  /**
   * Removes a dead enemy after its death animation delay has passed.
   * @param {MoveableObjekt} enemy - The enemy to check.
   * @param {number} index - Its index in the enemies array.
   */
  removeDeadEnemy(enemy, index) {
    const delay = enemy instanceof Endbosslevel1 ? 600 : 1000;
    if (enemy.isDead() && new Date().getTime() - enemy.deadTime > delay) {
      this.level.enemies.splice(index, 1);
    }
  }

  /** Checks all thrown bottles against all enemies for collisions. */
  handleBottleCollisions() {
    for (let i = this.throwableObjekt.length - 1; i >= 0; i--) {
      const bottle = this.throwableObjekt[i];
      if (bottle.splashDone) { this.throwableObjekt.splice(i, 1); continue; }
      if (bottle.splashing) continue;
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && bottle.isColliding(enemy)) {
          this.handleBottleEnemyHit(enemy, i);
        }
      });
    }
  }

  /**
   * Resolves a bottle hitting an enemy: damages it and starts the splash animation.
   * @param {MoveableObjekt} enemy - The enemy that was hit.
   * @param {number} bottleIndex - Index of the bottle in throwableObjekt.
   */
  handleBottleEnemyHit(enemy, bottleIndex) {
    enemy.hit();
    if (enemy.isDead()) this.playChickenDeadSound(enemy);
    if (enemy instanceof Endbosslevel1) this.updateEndbossStatus(enemy);
    this.throwableObjekt[bottleIndex].splash();
  }

  /** Starts the throw-input check interval. */
  checkThrow() {
    this.lastThrowTime = 0;
    setInterval(() => this.checkThrowTick(), 1000 / 25);
  }

  /** Checks whether the throw key was pressed and fires a bottle if ready. */
  checkThrowTick() {
    if (!this.keyboard.d) return;
    const now = Date.now();
    const cooldownReady = now - this.lastThrowTime >= 500;
    if (this.bottleCount > 0 && cooldownReady) this.throwBottle(now);
    this.keyboard.d = false;
  }

  /**
   * Creates a thrown bottle, decrements the bottle count, and updates the HUD.
   * @param {number} now - Current timestamp used to track throw cooldown.
   */
  throwBottle(now) {
    this.throwableObjekt.push(new ThrowableObjekt(this.character.x + 50, this.character.y + 100));
    this.bottleCount--;
    this.statusSalsaBottle.setPercentage((this.bottleCount / 15) * 100);
    this.lastThrowTime = now;
  }

  /** Starts the collectables pickup check interval. */
  checkCollectables() {
    setInterval(() => this.checkCollectablesTick(), 1000 / 25);
  }

  /** Tests all collectables for a collision with the character. */
  checkCollectablesTick() {
    this.level.collectables.forEach((item, index) => {
      if (this.character.isColliding(item)) this.collectItem(item, index);
    });
  }

  /**
   * Applies the effect of collecting an item and removes it from the level.
   * @param {Collectables} item - The collected item.
   * @param {number} index - Its index in the collectables array.
   */
  collectItem(item, index) {
    if (item instanceof Coin) {
      audioHub.playAudio(AudioHub.CoinCollect);
      this.coinCount++;
      this.statusCoins.setPercentage(Math.min(100, this.statusCoins.percentage + 20));
    } else if (item instanceof SalsaBottle) {
      audioHub.playAudio(AudioHub.BottleCollect);
      this.bottleCount = Math.min(15, this.bottleCount + 1);
      this.statusSalsaBottle.setPercentage((this.bottleCount / 15) * 100);
    }
    this.level.collectables.splice(index, 1);
  }

  /** Starts the game-over condition check interval. */
  checkGameOver() {
    setInterval(() => this.checkGameOverTick(), 1000 / 5);
  }

  /** Evaluates win/lose conditions each tick. */
  checkGameOverTick() {
    const endboss = this.level.enemies.find((e) => e instanceof Endbosslevel1);
    this.checkPastEndboss(endboss);
    if (this.character.isDead()) {
      this.triggerGameOver(endScreen);
    } else if (endboss && endboss.isDead()) {
      this.triggerGameOver(winScreen);
    }
  }

  /**
   * Kills the character instantly if they walk past the endboss.
   * @param {Endbosslevel1|undefined} endboss - The endboss, if present.
   */
  checkPastEndboss(endboss) {
    if (endboss && !endboss.isDead() && this.character.x > endboss.x + endboss.width) {
      this.character.hitpoints = 0;
      this.character.deadTime = new Date().getTime();
    }
  }

  /**
   * Stops all audio, sets gameOver, and shows the end screen.
   * @param {string} screen - Image path of the end screen to display.
   */
  triggerGameOver(screen) {
    if (this.gameOver) return;
    this.gameOver = true;
    AudioHub.stopAllSounds();
    audioHub.playAudio(screen === winScreen ? AudioHub.Win : AudioHub.Lose);
    this.showScreen(screen);
  }

  /**
   * Spawns a small chicken thrown by the endboss.
   * @param {number} x - Spawn x position.
   * @param {number} y - Spawn y position.
   */
  spawnThrownChicken(x, y) {
    const chicken = new ChickenSmall();
    chicken.speed = 8;
    chicken.launch(x, y);
    this.level.enemies.push(chicken);
  }

  /**
   * Draws an end/win screen image and shows the try-again button.
   * @param {string} imagePath - Path to the screen image.
   */
  showScreen(imagePath) {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    this.showTryAgainButton();
  }

  /** Makes the try-again button visible and wires it to returnToMenu. */
  showTryAgainButton() {
    const btn = document.getElementById("tryAgainButton");
    btn.style.display = "block";
    btn.onclick = () => returnToMenu();
  }

  /** Draws the full scene: background, HUD, world objects, then schedules the next frame. */
  draw() {
    if (this.gameOver) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjektToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.drawHUD();
    this.ctx.translate(this.camera_x, 0);
    this.drawWorldObjects();
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /** Draws all HUD elements: status bars and counters. */
  drawHUD() {
    this.addToMap(this.statusHitPoints);
    this.addToMap(this.statusCoins);
    this.addToMap(this.statusSalsaBottle);
    if (this.statusEndboss.visible) this.addToMap(this.statusEndboss);
    this.drawCounters();
  }

  /** Draws the coin and bottle count text on the canvas. */
  drawCounters() {
    this.ctx.save();
    this.ctx.font = "bold 16px 'Zabars', sans-serif";
    this.ctx.fillStyle = "#f0c040";
    this.ctx.strokeStyle = "rgba(0,0,0,0.8)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeText(`x ${this.coinCount}`, 210, 58);
    this.ctx.fillText(`x ${this.coinCount}`, 210, 58);
    this.ctx.strokeText(`x ${this.bottleCount}`, 210, 118);
    this.ctx.fillText(`x ${this.bottleCount}`, 210, 118);
    this.ctx.restore();
  }

  /** Draws all scrolling world objects: clouds, enemies, collectables, character, bottles. */
  drawWorldObjects() {
    this.addObjektToMap(this.level.clouds);
    this.addObjektToMap(this.level.enemies);
    this.addObjektToMap(this.level.collectables);
    this.addToMap(this.character);
    this.addObjektToMap(this.throwableObjekt);
  }

  /**
   * Draws each object in an array onto the map.
   * @param {DrawableObjekt[]} obj - Array of objects to draw.
   */
  addObjektToMap(obj) {
    obj.forEach((o) => this.addToMap(o));
  }

  /**
   * Draws a single object, flipping it horizontally if otherDirection is set.
   * @param {DrawableObjekt} movObj - The object to draw.
   */
  addToMap(movObj) {
    if (movObj.otherDirection) this.flipImage(movObj);
    movObj.draw(this.ctx);
    if (DEBUG) {
      movObj.drawFrame(this.ctx);
      movObj.drawFrameOffset(this.ctx);
    }
    if (movObj.otherDirection) this.flipImageBack(movObj);
  }

  /**
   * Flips the canvas context horizontally for the given object.
   * @param {DrawableObjekt} movObj - The object to flip.
   */
  flipImage(movObj) {
    this.ctx.save();
    this.ctx.translate(movObj.width, 0);
    this.ctx.scale(-1, 1);
    movObj.x = movObj.x * -1;
  }

  /**
   * Restores the canvas after a horizontal flip.
   * @param {DrawableObjekt} movObj - The object that was flipped.
   */
  flipImageBack(movObj) {
    movObj.x = movObj.x * -1;
    this.ctx.restore();
  }
}
