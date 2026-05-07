/** The level-1 endboss: alerts, chases, and throws small chickens at the character. */
class Endbosslevel1 extends MoveableObjekt {
  height = 400;
  width = 400;
  y = 80;
  imagesWalk = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  imagesAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  imagesHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = { top: 50, right: 50, bottom: 50, left: 80 };

  alertDistance = 600;
  hasAlerted = false;
  isChasing = false;
  isThrowing = false;
  alertFrame = 0;
  statusBarActivated = false;
  deathFrame = 0;

  /** Loads all sprite sets, places the boss at the end of the level, and starts its loops. */
  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.hitpoints = 200;
    this.x = 4500;
    this.speed = 5;
    this.animate();
    this.startThrowingChickens();
  }

  /**
   * Returns true if the character is within alert range.
   * @returns {boolean}
   */
  isInAlertRange() {
    return (
      this.world &&
      this.world.character &&
      Math.abs(this.x - this.world.character.x) < this.alertDistance
    );
  }

  /** Shows the endboss status bar and plays the approach sound once. */
  activateStatusBar() {
    if (!this.statusBarActivated) {
      this.statusBarActivated = true;
      if (this.world?.statusEndboss) this.world.statusEndboss.visible = true;
      audioHub.playAudio(AudioHub.EndbossApproach);
    }
  }

  /** Advances the alert animation and switches to chase mode when done. */
  handleAlertPhase() {
    if (this.isInAlertRange()) {
      this.activateStatusBar();
      this.playAnimation(this.imagesAlert);
      this.alertFrame += 2;
      if (this.alertFrame >= this.imagesAlert.length) {
        this.hasAlerted = true;
        this.isChasing = true;
        this.currentImage = 0;
      }
    } else {
      this.img = this.imageCache[this.imagesWalk[0]];
      this.alertFrame = 0;
    }
  }

  /** Advances the death animation frame by frame. */
  handleDeathAnimation() {
    if (this.deathFrame < this.imagesDead.length) {
      this.img = this.imageCache[this.imagesDead[this.deathFrame]];
      this.deathFrame++;
    }
  }

  /** Picks the correct animation/movement for one tick. */
  animateTick() {
    if (this.isDead()) {
      this.handleDeathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
    } else if (!this.isChasing) {
      this.handleAlertPhase();
    } else if (this.isThrowing) {
      this.playAnimation(this.imagesAttack);
    } else {
      this.moveLeft();
      this.playAnimation(this.imagesWalk);
    }
  }

  /** @returns {boolean} true for 500 ms after a hit (half the default window). */
  isHurt() {
    return new Date().getTime() - this.lastHit < 500;
  }

  /** Damages the endboss without extending an already-active hurt window. */
  hit() {
    this.hitpoints -= 20;
    if (this.hitpoints <= 0) {
      this.hitpoints = 0;
      this.deadTime = new Date().getTime();
    } else if (!this.isHurt()) {
      this.lastHit = new Date().getTime();
    }
  }

  /** Starts the animation interval. */
  animate() {
    setInterval(() => this.animateTick(), 1000 / 5);
  }

  /** Starts the periodic chicken-throwing interval. */
  startThrowingChickens() {
    setInterval(() => {
      if (this.isChasing && !this.isDead() && !this.isThrowing && this.world) {
        this.isThrowing = true;
        this.currentImage = 0;
        setTimeout(() => {
          if (!this.isDead() && this.world) this.world.spawnThrownChicken(this.x + 50, this.y + 180);
          this.isThrowing = false;
        }, 1200);
      }
    }, 1600);
  }
}
