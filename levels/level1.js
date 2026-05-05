const backgrounds = [];
const layers = [
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer",
  "img/5_background/layers/2_second_layer",
  "img/5_background/layers/1_first_layer",
];

const startScreen = "img/9_intro_outro_screens/start/startscreen_1.png";
const endScreen = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
const winScreen = "img/You won, you lost/You won A.png";

const totalSections = 11;
const startX = -720;

for (let i = 0; i < totalSections; i++) {
  const x = startX + i * 720;
  const imgIndex = (i % 2) + 1;
  backgrounds.push(new BackgroundObjekt(layers[0], x));
  backgrounds.push(new BackgroundObjekt(`${layers[1]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[2]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[3]}/${imgIndex}.png`, x));
}

/**
 * Creates a Chicken with the given position and speed.
 * @param {number} x - Horizontal start position.
 * @param {number} speed - Movement speed.
 * @returns {Chicken}
 */
function makeChicken(x, speed) {
  const c = new Chicken();
  c.x = x;
  c.speed = speed;
  return c;
}

/**
 * Creates a ChickenSmall with the given position and speed.
 * @param {number} x - Horizontal start position.
 * @param {number} speed - Movement speed.
 * @returns {ChickenSmall}
 */
function makeChickenSmall(x, speed) {
  const c = new ChickenSmall();
  c.x = x;
  c.speed = speed;
  return c;
}

let level1;

/**
 * Builds and returns the enemy array for level 1.
 * @returns {MoveableObjekt[]}
 */
function createEnemies() {
  const bigSpeeds = [1.7, 2.7, 1.8, 4.3, 2.7, 1.7, 4.6, 2.5, 4.5, 2.2];
  const smallSpeeds = [5.0, 5.6, 5.4, 6.2, 5.5, 6.0, 6.4, 5.2];
  const endbossZone = 3900;
  const enemies = [];
  for (let i = 0; i < 9; i++) {
    const x = 400 + i * 650;
    if (x < endbossZone) enemies.push(makeChicken(x, bigSpeeds[i]));
  }
  for (let i = 0; i < 8; i++) {
    const x = 725 + i * 650;
    if (x < endbossZone) enemies.push(makeChickenSmall(x, smallSpeeds[i]));
  }
  enemies.push(new Endbosslevel1());
  return enemies;
}

/**
 * Builds and returns the collectable array for level 1.
 * @returns {Collectables[]}
 */
function createCollectables() {
  return [
    new Coin(300, 350), new Coin(600, 160), new Coin(900, 250),
    new Coin(1200, 350), new Coin(1500, 160), new Coin(1800, 250),
    new Coin(2100, 350), new Coin(2400, 160), new Coin(2700, 250),
    new Coin(3000, 350), new Coin(3300, 160), new Coin(3600, 250),
    new Coin(3900, 350), new Coin(4200, 160),
    new SalsaBottle(267, 350), new SalsaBottle(534, 350), new SalsaBottle(800, 350),
    new SalsaBottle(1067, 350), new SalsaBottle(1334, 350), new SalsaBottle(1600, 350),
    new SalsaBottle(1867, 350), new SalsaBottle(2134, 350), new SalsaBottle(2400, 350),
    new SalsaBottle(2667, 350), new SalsaBottle(2934, 350), new SalsaBottle(3200, 350),
    new SalsaBottle(3467, 350), new SalsaBottle(3734, 350), new SalsaBottle(4000, 350),
  ];
}

/** Initialises level1 with all enemies, clouds, backgrounds, and collectables. */
function initLevel1() {
  level1 = new Level(
    createEnemies(),
    [new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    backgrounds,
    createCollectables(),
  );
}
