import Events from "./events";
import Level from "./level";
import SpaceShip from "../game-objects/space-ship";
import InputHandler from "./input-handler";
import Interface from "../game-objects/interface";

export default class Game {
  /** @type PIXI.Application */
  pixiApp;
  /** @type Interface */
  interface;
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

  /** @type PIXI.Container */
  worldContainer;
  /** @type PIXI.Container */
  interfaceContainer;

  /** @type boolean */
  started = false;
  /** @type boolean */
  pause = true;
  /** @type boolean */
  fail = false;
  /** @type boolean */
  win = false;

  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    this.worldContainer = new PIXI.Container();
    this.interfaceContainer = new PIXI.Container();
    for (let container of [this.worldContainer, this.interfaceContainer]) {
      const emptyGraphic = new PIXI.Graphics();
      emptyGraphic.beginFill(0x000000, 0);
      emptyGraphic.drawRect(0, 0, this.pixiApp.screen.width, this.pixiApp.screen.height);
      emptyGraphic.endFill();

      container.addChild(emptyGraphic);
      this.pixiApp.stage.addChild(container);
    }

    this.inputHandler = new InputHandler();
    this.events = new Events(this);
    this.spaceShip = new SpaceShip(this);
    this.level = new Level(this);
    this.interface = new Interface(this);

    this.inputHandler.onSpaceClick.subscribe(() => {
      this.setPause(!this.pause);
    });

    this.nextLevel();
  }

  nextLevel() {
    this.level.nextLevel();
    this.UFOs = this.level.UFOs;
  }

  setPause(pause) {
    this.pause = pause;
    this.events.gamePause.next(this.pause);
  }
}