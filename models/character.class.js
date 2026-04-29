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
    "img/2_character_pepe/1_idle/long_idle/L-11.png",
    "img/2_character_pepe/1_idle/long_idle/L-12.png",
    "img/2_character_pepe/1_idle/long_idle/L-13.png",
    "img/2_character_pepe/1_idle/long_idle/L-14.png",
    "img/2_character_pepe/1_idle/long_idle/L-15.png",
    "img/2_character_pepe/1_idle/long_idle/L-16.png",
    "img/2_character_pepe/1_idle/long_idle/L-17.png",
    "img/2_character_pepe/1_idle/long_idle/L-18.png",
    "img/2_character_pepe/1_idle/long_idle/L-19.png",
    "img/2_character_pepe/1_idle/long_idle/L-20.png",
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
    this.loadImages(this.Images_Walk);
    this.loadImages(this.Images_Jump);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDirection = false;
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.otherDirection = true;
        this.moveLeft();
      }
      if (this.world.keyboard.SPACE || this.world.keyboard.UP) {
        this.jump();
      }
      if (this.isHurt()) {
        this.playAnimation(this.Images_Hurt);
      } else if (this.isDead()) {
        this.playAnimation(this.Images_Dead);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.Images_Jump);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.Images_Walk);
        } else {
          this.playAnimation(this.Images_Idle);
        }
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 10);
  }
}
