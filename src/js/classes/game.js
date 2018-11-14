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

  /** @type boolean */
  pause = true;
  /** @type boolean */
  fail = false;
  /** @type boolean */
  win = false;

  constructor(pixiApp) {
    this.pixiApp = pixiApp;
    this.events = new Events(this);
    this.level = new Level(this);
    this.UFOs = this.level.UFOs;
    this.spaceShip = new SpaceShip(this);
  }
}