class StatusCoins extends StatusBar {
    Images_Coins = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
    ];

  constructor() {
    super();
    this.x = 5;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.Images = this.Images_Coins;
    this.loadImages(this.Images_Coins);
    this.setPercentage(100);
  }
}
