import Events from "./events";
import Level from "./level";
import SpaceShip from "../game-objects/space-ship";
import InputHandler from "./input-handler";

export default class Game {
  /** @type PIXI.Application */
  pixiApp;
  /** @type InputHandler */
  inputHandler;
  /** @type Level */
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
    this.inputHandler = new InputHandler();
    this.events = new Events(this);
    this.spaceShip = new SpaceShip(this);
    this.level = new Level(this);

    this.inputHandler.onSpaceClick.subscribe(() => {
      this.pause = !this.pause;
    });

    this.nextLevel();
  }

  nextLevel() {
    this.pause = false;
    this.level.nextLevel();
    this.UFOs = this.level.UFOs;
  }
}