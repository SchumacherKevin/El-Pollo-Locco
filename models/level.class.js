/** Holds all objects that make up a game level. */
class Level {
  enemies;
  backgroundObjects;
  clouds;
  collectables;
  level_end_x = 5000;

  /**
   * @param {MoveableObjekt[]} enemies - All enemy instances for this level.
   * @param {Cloud[]} clouds - Decorative cloud instances.
   * @param {BackgroundObjekt[]} backgroundObjects - Parallax background tiles.
   * @param {Collectables[]} collectables - All collectable items.
   */
  constructor(enemies, clouds, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
  }
}
