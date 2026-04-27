class StatusSalsaBottle extends StatusBar {
    Images_SalsaBottle = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];

  constructor() {
    super();
    this.x = 5;
    this.y = 80;
    this.width = 200;
    this.height = 60;
    this.Images = this.Images_SalsaBottle;
    this.loadImages(this.Images_SalsaBottle);
    this.setPercentage(0);
  }
}
