import _ from 'lodash';
import SpaceUFO from "../game-objects/space-ufo";
import SpaceShip from "../game-objects/space-ship";

const allChars = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default class Level {
  static UFO_GRID_OFFSET = 100;
  static UFO_GRID_INITIAL_BOTTOM = 100;
  static UFO_OFFSET = 50;
  static MAX_LEVEL = 7;

  game;
  pixiApp;

  number;
  charsets;
  UFOs;


  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.number = 1;
    this._initLevel(this.number);
  }

  nextLevel() {
    if (this.isLevelCompleted()) {
      if (this.number === Level.MAX_LEVEL) {
        // TODO game over
      }

      this._initLevel(++this.number);
    }
  }

  isLevelCompleted() {
    return !this.UFOs.length;
  }

  _initLevel(levelNumber) {
    this.number = levelNumber;

    this.charsets = allChars.map(() => this._getRandomCharset(levelNumber));

    this.UFOs = this.charsets.map((charset, i, arr) => {
      return new SpaceUFO(this.game, charset);
    });

    {
      // update UFOs positions to set UFO's grid
      const gridWidth = this.pixiApp.screen.width - Level.UFO_GRID_OFFSET;
      let line = 0;

      const totalUFOWidth = this.UFOs[0].container.width + Level.UFO_OFFSET;
      // maximum UFOs in line
      const countInLine = Math.floor(gridWidth / totalUFOWidth);
      // needs to middle grid position
      const lineLeftOffset = (gridWidth % totalUFOWidth) / 2;
      const lineHeight = this.UFOs[0].container.height + Level.UFO_OFFSET;
      this.UFOs.forEach((UFO, i) => {
        let UFOLineIndex = (i - countInLine * line);

        if (UFOLineIndex >= countInLine) {
          line++;
          UFOLineIndex = (i - countInLine * line)
        }

        UFO.container.x = Level.UFO_GRID_OFFSET + lineLeftOffset + UFO.container.width / 2 + UFO.container.width * UFOLineIndex + Level.UFO_OFFSET * UFOLineIndex;
        UFO.container.y = Level.UFO_GRID_INITIAL_BOTTOM - line * lineHeight;
      });
    }

    {
      //
    }
  }

  _getRandomCharset(length) {
    const allCharsClone = _.shuffle([...allChars]);
    return allCharsClone.splice(0, length);
  }
}