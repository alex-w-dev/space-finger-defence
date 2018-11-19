import _ from 'lodash';
import SpaceUFO from "../game-objects/space-ufo";
import Game from "./game";

export default class Level {
  static UFO_GRID_OFFSET = 100;
  static UFO_GRID_INITIAL_BOTTOM = 100;
  static UFO_OFFSET = 50;
  static MAX_LEVEL = 7;

  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  number;
  /** @type string[][] */
  charsets;
  /** @type SpaceUFO[] */
  UFOs = [];


  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.number = 0 ;

    this.game.events.onUFODestroyed.subscribe((UFO) => {
      if (this.isLevelCompleted()) {
        this.game.events.onLevelCompleted.next();
      }
    });
  }

  nextLevel() {
    if (this.isLevelCompleted()) {
      if (this.number === Level.MAX_LEVEL) {
        // TODO game over: WIN
      }

      this._initLevel(++this.number);
    }
  }

  restartLevel() {
    this._levelUFOsDestroy();
    this._initLevel(this.number);
  }

  newGame() {
    this._levelUFOsDestroy();
    this.number = 1;
    this._initLevel(this.number);
  }

  isLevelCompleted() {
    return !this.UFOs || !this.UFOs.length || this.UFOs.every(UFO => UFO.destroyedBySpaceShip);
  }

  _initLevel(levelNumber) {
    this.number = levelNumber;

    this.charsets = Game.CHOOT_CHARS.map(() => this._getRandomCharset(levelNumber));

    this.UFOs = this.charsets.map((charset, i, arr) => {
      return new SpaceUFO(this.game, charset);
    });

    {
      // update UFOs positions to set UFO's grid
      const gridWidth = this.pixiApp.screen.width - Level.UFO_GRID_OFFSET;
      let line = 0;

      const totalUFOWidth = this.UFOs[0].container.width + Level.UFO_OFFSET;
      // maximum UFOs in line
      const countInLine = Math.ceil(gridWidth / totalUFOWidth);
      // needs to middle grid position
      const lineHeight = this.UFOs[0].container.height + Level.UFO_OFFSET;
      this.UFOs.forEach((UFO, i) => {
        let UFOLineIndex = (i - countInLine * line);

        if (UFOLineIndex >= countInLine) {
          line++;
          UFOLineIndex = (i - countInLine * line)
        }

        UFO.container.x = Level.UFO_GRID_OFFSET / 2 + totalUFOWidth / 2 + totalUFOWidth * UFOLineIndex;
        UFO.container.y = Level.UFO_GRID_INITIAL_BOTTOM - line * lineHeight;
      });
    }

    {
      //
    }
  }

  _getRandomCharset(length) {
    const allCharsClone = _.shuffle([...Game.CHOOT_CHARS]);
    return allCharsClone.splice(0, length);
  }

  _levelUFOsDestroy() {
    this.UFOs.forEach((UFO) => UFO.destroy(false));
  }
}