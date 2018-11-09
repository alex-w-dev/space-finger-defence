import _ from 'lodash';
import SpaceUFO from "../game-objects/space-ufo";

const allChars = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default class Levels {
  app;
  levels;

  constructor(app) {
    this.app = app;

    this.levels = this._getNewLevels();
  }

  getCurrentLevel() {
    return this.levels.find((l) => !l.passed);
  }

  passLevel(level) {
    if (!level.UFOs.length) {
      level.passed = true;

      // return next level after pass
      return this.getCurrentLevel();
    }
  }

  _getNewLevels() {
    return allChars.map((char, i) => {
      const charsets = allChars.map(() => this._getRandomCharset(i + 1));

      const UFOs = charsets.map((charset, i, arr) => {


        return new SpaceUFO(this.app, charset);
      });

      return {
        number: i + 1,
        passed: false,
        charsets,
        UFOs,
      }
    });
  }

  _getRandomCharset(length) {
    const allCharsClone = _.shuffle([...allChars]);
    return allCharsClone.splice(0, length);
  }
}