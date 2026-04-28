class Level {
  enemies;
  backgroundObjects;
  clouds;
  collectables;
  level_end_x = 720 * 10;
  constructor(enemies, clouds, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
