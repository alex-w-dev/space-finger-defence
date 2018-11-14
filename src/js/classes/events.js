import { Subject, BehaviorSubject } from 'rxjs';

export default class Events {
  /** @type BehaviorSubject<Game.pause> */
  gamePause;
  /** @type BehaviorSubject<Game.fail> */
  gameFail;
  /** @type BehaviorSubject<Game.win> */
  gameWin;

  /** @param { Game } game */
  constructor(game) {
    this.gamePause = new BehaviorSubject(game.pause);
    this.gameFail = new BehaviorSubject(game.fail);
    this.gameWin = new BehaviorSubject(game.win);
  }
}