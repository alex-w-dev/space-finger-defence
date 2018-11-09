import SpaceUFO from "./game-objects/space-ufo";
import _ from 'lodash';
import * as PIXI from 'pixi.js';
import SpaceShip from './game-objects/space-ship';
import Levels from "./classes/levels";


const app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);

const spaceShip = new SpaceShip(app);
const spaceUFO = new SpaceUFO(app, ['d',]);
//
// const levels = new Levels(app);
// console.log(levels, 'levels');

app.stage.addChild(spaceShip.sprite);
app.stage.addChild(spaceUFO.container);