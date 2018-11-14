import Events from "./events";
import Level from "./level";
import SpaceShip from "../game-objects/space-ship";

export default class Game {
  /** @type PIXI.Application */
  pixiApp;
  inputHandler;
  level;
  /** @type SpaceShip */
  spaceShip;
  /** @type UFO[] */
  UFOs;
  /** @type Events */
  events;

  status = 'start';

  constructor(pixiApp) {
    this.pixiApp = pixiApp;
    this.events = new Events();
    this.level = new Level(this);
    this.UFOs = this.level.UFOs;
    this.spaceShip = new SpaceShip(this);


  }
}