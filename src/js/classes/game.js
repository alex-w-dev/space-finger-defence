import Events from "./events";
import Level from "./level";
import SpaceShip from "../game-objects/space-ship";
import InputHandler from "./input-handler";
import Interface from "../interface/interface";
import {BehaviorSubject} from "rxjs/index";

export default class Game {
  // static SHOOT_CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  static SHOOT_CHARS = 'aaaaaaaaaaaa'.split('');

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

  /** @type BehaviorSubject<boolean> */
  started = new BehaviorSubject(false);
  /** @type BehaviorSubject<boolean> */
  choosingDifficulty = new BehaviorSubject(false);
  /** @type BehaviorSubject<number> */
  levelWaiting = new BehaviorSubject(0);
  /** @type BehaviorSubject<boolean> */
  pause = new BehaviorSubject(false);
  /** @type BehaviorSubject<boolean> */
  fail = new BehaviorSubject(false);
  /** @type BehaviorSubject<boolean> */
  win = new BehaviorSubject(false);

  levelWaitingInterval;

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
      if (!this.started.getValue() || this.fail.getValue() || this.win.getValue() || this.choosingDifficulty.getValue()) return;

      if (pause !== undefined) {
        this.setPause(pause);
      } else {
        this.setPause(!this.pause.getValue());
      }
    });

    this.events.onRestartLevelClick.subscribe(() => {
      if (! this.started.getValue()) return;

      this.restartLevel();
    });
    this.events.onNewGameClick.subscribe(() => {
      this.setChoosingDifficulty(true);
      this.setStarted(true);
      this.setPause(false);
      this.setFail(false);
      this.setWin(false);
    });
    this.events.onSelectDifficultyClick.subscribe((difficulty) => {
      this.setChoosingDifficulty(false);
      this.level.difficulty = difficulty;
      this.newGame();
    });
    this.events.onMainMenuClick.subscribe(() => {
      this.level.levelAllUFOsDestroy();
      this.setStarted(false);
      this.setChoosingDifficulty(false);
      this.setFail(false);
      this.setPause(false);
      this.setWin(false);
    });
    this.events.onShootCharClick.subscribe((char) => {
      if (this.isWorldFrozen()) return;

      this.shootUFO(char)
    });
    this.events.onLevelCompleted.subscribe(() => {
      if (!this.started.getValue()) return;

      this.nextLevel();
    });
    this.events.onUFOTouchedSpaceShip.subscribe(() => {
      if (this.fail.getValue() || this.win.getValue()) return;

      this.setFail(true);
    });
    this.events.onNoMoreLevels.subscribe(() => {
      if (this.win.getValue() || this.fail.getValue()) return;

      this.setWin(true);
    });
  }

  nextLevel() {
    this.level.nextLevel();
    this._startLevelWaiting();
  }

  newGame() {
    this.setStarted(true);
    this.setPause(false);
    this.setFail(false);

    this.level.newGame();
    this._startLevelWaiting();
  }

  restartLevel() {
    this.setPause(false);
    this.setFail(false);

    this.level.restartLevel();
    this._startLevelWaiting();
  }

  setPause(pause) {
    this.pause.next(pause);
  }

  setChoosingDifficulty(choosingDifficulty) {
    this.choosingDifficulty.next(choosingDifficulty);
  }

  setStarted(started) {
    this.started.next(started);
  }

  setWin(win) {
    this.win.next(win);
  }

  setLevelWaiting(levelWaiting) {
    this.levelWaiting.next(levelWaiting);
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
    this.fail.next(fail);
  }

  isWorldFrozen() {
    return  this.pause.getValue() ||
            this.fail.getValue() ||
            this.win.getValue() ||
            this.choosingDifficulty.getValue() ||
            this.levelWaiting.getValue() ||
            !this.started.getValue();
  }

  _startLevelWaiting() {
    if (this.win.getValue() || this.fail.getValue()) return;

    this._stopLevelWaiting();

    let secondsLeft = Level.WAVE_WAITING_TIME;
    this.setLevelWaiting(secondsLeft);
    this.levelWaitingInterval = setInterval(() => {
      if (secondsLeft) {
        this.setLevelWaiting(--secondsLeft);
      } else {
        this._stopLevelWaiting();
      }
    }, 1000);
  }

  _stopLevelWaiting() {
    if (this.levelWaitingInterval) clearInterval(this.levelWaitingInterval);
    if (this.levelWaiting.getValue()) this.setLevelWaiting(0);
  }
}