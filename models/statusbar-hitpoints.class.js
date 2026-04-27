class StatusHitPoints extends StatusBar {
  Images_Hitpoints = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super();
    this.x = 5;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.Images = this.Images_Hitpoints;
    this.loadImages(this.Images_Hitpoints);
    this.setPercentage(100);
  }
}
