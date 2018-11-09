import SpaceUFO from "./game-objects/space-ufo";
import _ from 'lodash';
import * as PIXI from 'pixi.js';
import SpaceShip from './game-objects/space-ship';
import Level from "./classes/level";


const app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);
app.ticker.minFPS = 60;



const spaceShip = new SpaceShip(app);
// const spaceUFO = new SpaceUFO(app, ['d',]);
//
const level = new Level(app);
console.log(level, 'levels');

app.stage.addChild(spaceShip.sprite);

for (let UFO of level.UFOs) {
  app.stage.addChild(UFO.container);
}

{
  // actions start
  _.shuffle([...level.UFOs]).forEach((UFO) => spaceShip.addUFO(UFO));

}