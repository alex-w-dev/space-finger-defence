import SpaceUFO from "./game-objects/space-ufo";
import _ from 'lodash';
const PIXI = require('./lib/pixi/pixi');
import SpaceShip from './game-objects/space-ship';
import Levels from "./classes/levels";


const app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

const spaceShip = new SpaceShip(app);
const spaceUFO = new SpaceUFO(app, ['d']);

const levels = new Levels(app);
console.log(levels, 'levels');

app.stage.addChild(spaceShip.sprite);
app.stage.addChild(spaceUFO.sprite);