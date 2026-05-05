class StatusHitPoints extends StatusBar {
  imagesHitpoints = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /** @inheritdoc */
  constructor() {
    super();
    this.x = 5;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.images = this.imagesHitpoints;
    this.loadImages(this.imagesHitpoints);
    this.setPercentage(100);
  }
}
