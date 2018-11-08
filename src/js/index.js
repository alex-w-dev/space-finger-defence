const PIXI = require('./lib/pixi/pixi');
import SpaceShip from './game-objects/space-ship';

const app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

const spaceShip = new SpaceShip(app);



app.stage.addChild(spaceShip.sprite);