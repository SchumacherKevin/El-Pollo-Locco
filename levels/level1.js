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

const totalSections = 8;

for (let i = 0; i < totalSections; i++) {
  const x = i * 720;
  const imgIndex = (i % 2) + 1;

  backgrounds.push(new BackgroundObjekt(layers[0], x));
  backgrounds.push(new BackgroundObjekt(`${layers[1]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[2]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[3]}/${imgIndex}.png`, x));
}

function makeChicken(x, speed) {
  const c = new Chicken();
  c.x = x;
  c.speed = speed;
  return c;
}

function makeChickenSmall(x, speed) {
  const c = new ChickenSmall();
  c.x = x;
  c.speed = speed;
  return c;
}

let level1;

function initLevel1() {
  level1 = new Level(
    [
      makeChicken(300, 0.8),
      makeChicken(600, 1.4),
      makeChicken(900, 0.9),
      makeChickenSmall(1100, 2.8),
      makeChicken(1300, 2.2),
      makeChickenSmall(1500, 3.2),
      makeChicken(1700, 1.4),
      makeChickenSmall(1900, 3.0),
      makeChicken(2100, 0.8),
      makeChicken(2300, 2.4),
      makeChickenSmall(2500, 3.5),
      makeChicken(2700, 1.3),
      makeChickenSmall(2900, 3.1),
      makeChicken(3100, 2.3),
      makeChickenSmall(3300, 3.4),
      makeChicken(3500, 0.9),
      makeChicken(3700, 1.5),
      makeChickenSmall(3900, 3.6),
      makeChicken(4100, 2.5),
      new Endbosslevel1(),
    ],

    [new Cloud(), new Cloud(), new Cloud(), new Cloud()],

    backgrounds,

    [
      new Coin(300, 350),
      new Coin(600, 160),
      new Coin(900, 250),
      new Coin(1200, 350),
      new Coin(1500, 160),
      new Coin(1800, 250),
      new Coin(2100, 350),
      new Coin(2400, 160),
      new Coin(2700, 250),
      new Coin(3000, 350),
      new Coin(3300, 160),
      new Coin(3600, 250),
      new Coin(3900, 350),
      new Coin(4200, 160),

      new SalsaBottle(267, 350),
      new SalsaBottle(534, 350),
      new SalsaBottle(800, 350),
      new SalsaBottle(1067, 350),
      new SalsaBottle(1334, 350),
      new SalsaBottle(1600, 350),
      new SalsaBottle(1867, 350),
      new SalsaBottle(2134, 350),
      new SalsaBottle(2400, 350),
      new SalsaBottle(2667, 350),
      new SalsaBottle(2934, 350),
      new SalsaBottle(3200, 350),
      new SalsaBottle(3467, 350),
      new SalsaBottle(3734, 350),
      new SalsaBottle(4000, 350),
    ],
  );
}
