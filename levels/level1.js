const backgrounds = [];
const layers = [
  "img/5_background/layers/air.png",
  "img/5_background/layers/3_third_layer",
  "img/5_background/layers/2_second_layer",
  "img/5_background/layers/1_first_layer",
];

const totalSections = 10;

for (let i = -totalSections / 2; i < totalSections / 2; i++) {
  const x = i * 720;
  const imgIndex = (((i % 2) + 2) % 2) + 1;

  backgrounds.push(new BackgroundObjekt(layers[0], x));
  backgrounds.push(new BackgroundObjekt(`${layers[1]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[2]}/${imgIndex}.png`, x));
  backgrounds.push(new BackgroundObjekt(`${layers[3]}/${imgIndex}.png`, x));
}

const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new ChickenSmall(), new Endbosslevel1()],
  [new Cloud()],
  backgrounds,
  [new Coin(300, 350), new Coin(600, 350), new SalsaBottle(400, 350), new SalsaBottle(800, 350)]
);
