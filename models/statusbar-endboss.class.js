class StatusbarEndboss extends StatusBar {
  Images_Endboss = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  constructor() {
    super();
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.Images = this.Images_Endboss;
    this.loadImages(this.Images_Endboss);
    this.setPercentage(100);
  }
}