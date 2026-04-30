const backgrounds = [];
const layers = [
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer",
  "img/5_background/layers/2_second_layer",
  "img/5_background/layers/1_first_layer",
];

const startScreen = "img/9_intro_outro_screens/start/startscreen_1.png";
const endScreen = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
const winScreen ="img/You won, you lost/You won A.png";

const totalSections = 10;

for (let i = -totalSections / 2; i < totalSections / 2; i++) {
  const x = i * 720;
  const imgIndex = (((i % 2) + 2) % 2) + 1;

  backgrounds.push(new BackgroundObjekt(layers[0], x));
  backgrounds.push(new BackgroundObjekt(`${layers[1]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[2]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[3]}/${imgIndex}.png`, x));
}

let level1;

function initLevel1() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new Endbosslevel1(),
    ],
    [new Cloud()],
    backgrounds,
    [
      new Coin(300, 350),
      new Coin(600, 350),
      new SalsaBottle(400, 350),
      new SalsaBottle(800, 350),
    ],
  );
}
