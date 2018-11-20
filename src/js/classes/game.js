import Events from "./events";
import Level from "./level";
import SpaceShip from "../game-objects/space-ship";
import InputHandler from "./input-handler";
import Interface from "../interface/interface";

export default class Game {
  // static CHOOT_CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  static CHOOT_CHARS = 'aaaaa'.split('');

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
  /** @type Events */
  events;

  /** @type PIXI.Container */
  worldContainer;
  /** @type PIXI.Container */
  interfaceContainer;

  /** @type boolean */
  started = false;
  /** @type boolean */
  pause = false;
  /** @type boolean */
  fail = false;
  /** @type boolean */
  win = false;

  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    this.backgroundContainer = new PIXI.Container();
    const worldBG = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage('../../img/spaceArt/png/Background/starBackground.png'), 800, 600);
    this.pixiApp.ticker.add(delta => worldBG.tilePosition.y += delta * .05);
    this.backgroundContainer.addChild(worldBG);
    this.worldContainer = new PIXI.Container();
    this.interfaceContainer = new PIXI.Container();
    for (let container of [this.backgroundContainer, this.worldContainer, this.interfaceContainer]) {
      const emptyGraphic = new PIXI.Graphics();
      emptyGraphic.beginFill(0x000000, 0);
      emptyGraphic.drawRect(0, 0, this.pixiApp.screen.width, this.pixiApp.screen.height);
      emptyGraphic.endFill();

      container.addChild(emptyGraphic);
      this.pixiApp.stage.addChild(container);
    }

    this.inputHandler = new InputHandler(this);
    this.events = new Events(this);
    this.spaceShip = new SpaceShip(this);
    this.level = new Level(this);
    this.interface = new Interface(this);

    this.events.onPauseClick.subscribe((pause) => {
      if (!this.started || this.fail || this.win) return;

      if (pause !== undefined) {
        this.setPause(pause);
      } else {
        this.setPause(!this.pause);
      }
    });

    this.events.onRestartLevelClick.subscribe(() => {
      if (! this.started) return;

      this.restartLevel();
    });
    this.events.onNewGameClick.subscribe(() => {
      this.newGame();
    });
    this.events.onShootCharClick.subscribe((char) => {
      if (!this.started || this.pause || this.fail) return;

      this.shootUFO(char)
    });
    this.events.onLevelCompleted.subscribe(() => {
      if (!this.started) return;

      this.nextLevel();
    });
    this.events.onUFOTouchedSpaceShip.subscribe(() => {
      if (this.fail) return;

      this.setFail(true);
    });
  }

  nextLevel() {
    this.level.nextLevel();
  }

  newGame() {
    this.setStarted(true);
    this.setPause(false);
    this.setFail(false);
    this.level.newGame();
  }

  restartLevel() {
    this.setPause(false);
    this.setFail(false);

    this.level.restartLevel();
  }

  setPause(pause) {
    this.pause = pause;
    this.events.gamePause.next(this.pause);
  }

  setStarted(started) {
    this.started = started;
    this.events.gameStarted.next(this.started);
  }

  shootUFO(char) {
    const UFO = this.level.UFOs.find(UFO => !!UFO.getFreeTextChar(char));

    if (UFO) {
      const freeTextChar = UFO.getFreeTextChar(char);
      this.spaceShip.addTextChar(freeTextChar);
      UFO.markTextChar(freeTextChar);
    }
  }

  setFail(fail) {
    this.fail = fail;

    this.events.gameFail.next(this.fail);
  }
}