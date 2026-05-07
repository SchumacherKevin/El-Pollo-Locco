/** The player-controlled character with walk, jump, idle, hurt, and death animations. */
class Character extends MoveableObjekt {
  height = 280;
  y = 200;
  imagesIdle = [
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
  imagesLongIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  imagesWalk = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJump = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  speed = 20;
  offset = { top: 125, right: 35, bottom: 15, left: 25 };

  /** Loads all sprite sets and starts gravity and the animation loop. */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.applyGravity();
    this.animate();
  }

  /** Initialises all animation state flags to their default values. */
  initAnimationState() {
    this.idleTime = 0;
    this.jumpSoundPlayed = false;
    this.hurtSoundPlayed = false;
    this.deathSoundPlayed = false;
    this.isRunning = false;
    this.lastRunSound = 0;
    this.lastSnoringSound = 0;
  }

  /** Starts the main animation interval. */
  animate() {
    this.initAnimationState();
    setInterval(() => this.animationTick(), 1000 / 10);
  }

  /** Runs one animation tick: movement, jump, idle tracking, and animation. */
  animationTick() {
    const now = Date.now();
    const movingLeft = this.world.keyboard.LEFT && this.x > 0;
    const movingRight = this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    const wasActive = this.isAnyKeyPressed();
    if (!this.isDead()) this.handleMovement(movingLeft, movingRight, now);
    if (!this.isDead()) this.handleJump();
    this.updateIdleState(wasActive, now);
    this.updateAnimation(movingLeft, movingRight, wasActive, now);
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Returns true if any movement or action key is currently pressed.
   * @returns {boolean}
   */
  isAnyKeyPressed() {
    const kb = this.world.keyboard;
    return kb.RIGHT || kb.LEFT || kb.SPACE || kb.UP || kb.d;
  }

  /**
   * Moves the character left or right and plays the run sound.
   * @param {boolean} movingLeft - Whether the left key is held.
   * @param {boolean} movingRight - Whether the right key is held.
   * @param {number} now - Current timestamp in ms.
   */
  handleMovement(movingLeft, movingRight, now) {
    if (movingRight) {
      this.otherDirection = false;
      this.moveRight();
    } else if (movingLeft) {
      this.otherDirection = true;
      this.moveLeft();
    }
    if ((movingLeft || movingRight) && !this.isAboveGround()) {
      this.playRunSound(now);
    } else {
      this.stopRunSound();
    }
  }

  /**
   * Plays the run sound if the cooldown has elapsed.
   * @param {number} now - Current timestamp in ms.
   */
  playRunSound(now) {
    if (!this.isRunning || now - this.lastRunSound > 400) {
      audioHub.playAudio(AudioHub.CharacterRun);
      this.lastRunSound = now;
      this.isRunning = true;
    }
  }

  /** Stops the run sound and clears the running flag. */
  stopRunSound() {
    if (this.isRunning) {
      audioHub.stopOneAudio(AudioHub.CharacterRun);
      this.isRunning = false;
    }
  }

  /** Handles jumping input and the jump sound. */
  handleJump() {
    const kb = this.world.keyboard;
    if ((kb.SPACE || kb.UP) && !this.isAboveGround()) {
      this.jump();
      if (!this.jumpSoundPlayed) {
        audioHub.playAudio(AudioHub.CharacterJump);
        this.jumpSoundPlayed = true;
      }
    }
    if (!kb.SPACE && !kb.UP) this.jumpSoundPlayed = false;
  }

  /**
   * Tracks idle time and stops snoring when the character becomes active.
   * @param {boolean} wasActive - Whether any key was pressed this tick.
   * @param {number} now - Current timestamp in ms (unused, kept for signature consistency).
   */
  updateIdleState(wasActive, now) {
    if (wasActive || this.isHurt() || this.isDead() || this.isAboveGround()) {
      this.idleTime = 0;
      audioHub.stopOneAudio(AudioHub.CharacterSnoring);
      this.lastSnoringSound = 0;
    } else {
      this.idleTime += 100;
    }
    if (this.isDead()) this.stopRunSound();
  }

  /**
   * Selects and plays the appropriate animation for the current state.
   * @param {boolean} movingLeft - Whether the character moved left this tick.
   * @param {boolean} movingRight - Whether the character moved right this tick.
   * @param {boolean} wasActive - Whether any key was pressed this tick.
   * @param {number} now - Current timestamp in ms.
   */
  updateAnimation(movingLeft, movingRight, wasActive, now) {
    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playHurtAnimation();
    } else {
      this.hurtSoundPlayed = false;
      this.playActiveAnimation(movingLeft, movingRight, wasActive, now);
    }
  }

  /** Plays the death animation and triggers the death sound once. */
  playDeadAnimation() {
    this.playAnimation(this.imagesDead);
    if (!this.deathSoundPlayed) {
      audioHub.playAudio(AudioHub.CharacterDead);
      this.deathSoundPlayed = true;
    }
  }

  /** Plays the hurt animation and triggers the hurt sound once. */
  playHurtAnimation() {
    this.playAnimation(this.imagesHurt);
    if (!this.hurtSoundPlayed) {
      audioHub.playAudio(AudioHub.CharacterDamage);
      this.hurtSoundPlayed = true;
    }
  }

  /**
   * Picks the correct animation when the character is alive and not hurt.
   * @param {boolean} movingLeft - Whether the character moved left this tick.
   * @param {boolean} movingRight - Whether the character moved right this tick.
   * @param {boolean} wasActive - Whether any key was pressed this tick.
   * @param {number} now - Current timestamp in ms.
   */
  playActiveAnimation(movingLeft, movingRight, wasActive, now) {
    if (this.isAboveGround()) {
      this.playAnimation(this.imagesJump);
    } else if (movingRight || movingLeft) {
      this.playAnimation(this.imagesWalk);
    } else if (this.idleTime >= 5000 && !wasActive) {
      this.playLongIdleAnimation(now);
    } else {
      this.playAnimation(this.imagesIdle);
      this.lastSnoringSound = 0;
    }
  }

  /**
   * Plays the long-idle (snoring) animation and triggers the snore sound.
   * @param {number} now - Current timestamp in ms.
   */
  playLongIdleAnimation(now) {
    this.playAnimation(this.imagesLongIdle);
    if (now - this.lastSnoringSound > 3000 && !this.world.gameOver) {
      audioHub.playAudio(AudioHub.CharacterSnoring);
      this.lastSnoringSound = now;
    }
  }
}
