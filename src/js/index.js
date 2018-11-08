const PIXI = require('./lib/pixi/pixi');

const app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

const spaceShip = PIXI.Sprite.fromImage('../img/spaceArt/png/player.png');

app.stage.addChild(spaceShip);