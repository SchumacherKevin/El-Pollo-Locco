class Character extends MoveableObjekt {
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
  Images_LongIdle = [
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
  Images_Walk = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  Images_Jump = [
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
  Images_Dead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  Images_Hurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  speed = 10;
  offset = { top: 125, right: 35, bottom: 15, left: 25 };

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.Images_Idle);
    this.loadImages(this.Images_LongIdle);
    this.loadImages(this.Images_Walk);
    this.loadImages(this.Images_Jump);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.idleTime = 0;
    this.jumpSoundPlayed = false;
    this.hurtSoundPlayed = false;
    this.deathSoundPlayed = false;
    this.isRunning = false;
    this.lastRunSound = 0;
    this.lastSnoringSound = 0;

    setInterval(() => {
      const now = Date.now();
      const movingLeft = this.world.keyboard.LEFT && this.x > 0;
      const movingRight =
        this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
      const wasActive =
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.SPACE ||
        this.world.keyboard.UP;

      if (movingRight) {
        this.otherDirection = false;
        this.moveRight();
        if (!this.isRunning) {
          this.isRunning = true;
          audioHub.playAudio(AudioHub.CharacterRun);
          this.lastRunSound = now;
        } else if (now - this.lastRunSound > 400) {
          audioHub.playAudio(AudioHub.CharacterRun);
          this.lastRunSound = now;
        }
      } else if (movingLeft) {
        this.otherDirection = true;
        this.moveLeft();
        if (!this.isRunning) {
          this.isRunning = true;
          audioHub.playAudio(AudioHub.CharacterRun);
          this.lastRunSound = now;
        } else if (now - this.lastRunSound > 400) {
          audioHub.playAudio(AudioHub.CharacterRun);
          this.lastRunSound = now;
        }
      } else {
        if (this.isRunning) {
          audioHub.stopOneAudio(AudioHub.CharacterRun);
          this.isRunning = false;
        }
      }

      if (
        (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
        !this.isAboveGround()
      ) {
        this.jump();
        if (!this.jumpSoundPlayed) {
          audioHub.playAudio(AudioHub.CharacterJump);
          this.jumpSoundPlayed = true;
        }
      }

      if (!this.world.keyboard.SPACE && !this.world.keyboard.UP) {
        this.jumpSoundPlayed = false;
      }

      if (wasActive || this.isHurt() || this.isDead() || this.isAboveGround()) {
        this.idleTime = 0;
      } else {
        this.idleTime += 100;
      }

      if (this.isDead()) {
        this.playAnimation(this.Images_Dead);
        if (!this.deathSoundPlayed) {
          audioHub.playAudio(AudioHub.CharacterDead);
          this.deathSoundPlayed = true;
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.Images_Hurt);
        if (!this.hurtSoundPlayed) {
          audioHub.playAudio(AudioHub.CharacterDamage);
          this.hurtSoundPlayed = true;
        }
      } else {
        this.hurtSoundPlayed = false;
      }

      if (!this.isDead() && !this.isHurt()) {
        if (this.isAboveGround()) {
          this.playAnimation(this.Images_Jump);
        } else if (movingRight || movingLeft) {
          this.playAnimation(this.Images_Walk);
        } else if (this.idleTime >= 5000) {
          this.playAnimation(this.Images_LongIdle);
          if (now - this.lastSnoringSound > 3000 && !this.world.gameOver) {
            audioHub.playAudio(AudioHub.CharacterSnoring);
            this.lastSnoringSound = now;
          }
        } else {
          this.playAnimation(this.Images_Idle);
          this.lastSnoringSound = 0;
        }
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 10);
  }
}
