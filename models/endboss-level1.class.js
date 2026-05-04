class Endbosslevel1 extends MoveableObjekt {
  height = 400;
  width = 400;
  y = 80;
  Images_Walk = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  Images_Alert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  Images_Attack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  Images_Hurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  Images_Dead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  alertDistance = 600;
  hasAlerted = false;
  isChasing = false;
  alertFrame = 0;
  statusBarActivated = false;
  deathFrame = 0;

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.Images_Walk);
    this.loadImages(this.Images_Alert);
    this.loadImages(this.Images_Attack);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.hitpoints = 200;
    this.x = 4500;
    this.speed = 5;
    this.animate();
  }

  isInAlertRange() {
    return (
      this.world &&
      this.world.character &&
      Math.abs(this.x - this.world.character.x) < this.alertDistance
    );
  }

  activateStatusBar() {
    if (!this.statusBarActivated) {
      this.statusBarActivated = true;
      if (this.world?.statusEndboss) {
        this.world.statusEndboss.visible = true;
      }
      audioHub.playAudio(AudioHub.EndbossApproach);
    }
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        if (this.deathFrame < this.Images_Dead.length) {
          this.img = this.imageCache[this.Images_Dead[this.deathFrame]];
          this.deathFrame++;
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.Images_Hurt);
      } else if (!this.isChasing) {
        if (this.isInAlertRange()) {
          this.activateStatusBar();
          this.playAnimation(this.Images_Alert);
          this.alertFrame++;
          if (this.alertFrame >= this.Images_Alert.length) {
            this.hasAlerted = true;
            this.isChasing = true;
            this.currentImage = 0;
          }
        } else {
          this.img = this.imageCache[this.Images_Walk[0]];
          this.alertFrame = 0;
        }
      } else {
        this.moveLeft();
        this.playAnimation(this.Images_Walk);
      }
    }, 1000 / 5);
  }
}
