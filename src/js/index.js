import * as PIXI from 'pixi.js';
import Game from "./classes/game";


const pixiApp = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(pixiApp.view);

const game = new Game(pixiApp);