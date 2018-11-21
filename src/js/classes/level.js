import _ from 'lodash';
import SpaceUFO from "../game-objects/space-ufo";
import Game from "./game";

export default class Level {
  static DIFFICULTY_OF_GAME = {
    EASY: 1,
    NORMAL: 2,
    HARD: 3,
  };
  static MAX_CHARSET_LENGTH = 5;
  static UFO_GRID_OFFSET = 50;
  static UFO_GRID_INITIAL_BOTTOM = 100;
  static UFO_OFFSET = 10;
  static MAX_LEVEL = 7;

  /** @type number */
  difficulty = Level.DIFFICULTY_OF_GAME.EASY;
  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  number;
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
        alert('WIN');

        return;
      }

      this._initLevel(++this.number);
    }
  }

  restartLevel() {
    this.levelAllUFOsDestroy();
    this._initLevel(this.number);
  }

  newGame() {
    this.levelAllUFOsDestroy();
    this.number = 1;
    this._initLevel(this.number);
  }

  isLevelCompleted() {
    return !this.UFOs || !this.UFOs.length || this.UFOs.every(UFO => UFO.destroyedBySpaceShip);
  }

  _initLevel(levelNumber) {
    this.number = levelNumber;

    this.UFOs = [];
    for (let i = 0; i < 7 * this.difficulty; i++) {
      this.UFOs.push(new SpaceUFO(this.game, this._getRandomCharset()));
    }

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

  _getRandomCharset() {
    const middle = this.number / Level.MAX_LEVEL * Level.MAX_CHARSET_LENGTH;
    const length = _.random(Math.floor(middle) || 1, Math.ceil(middle));

    const allCharsClone = _.shuffle([...Game.CHOOT_CHARS]);
    return allCharsClone.splice(0, length);
  }

  levelAllUFOsDestroy() {
    this.UFOs.forEach((UFO) => UFO.destroy(false));
  }
}