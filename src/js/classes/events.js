import { Subject, BehaviorSubject } from 'rxjs';

export default class Events {
  onPauseClick = new Subject();
  onGameStartClick = new Subject();
  /** @type Subject<string> */
  onShootCharClick = new Subject();
  /** @type Subject<SpaceUFO> */
  onUFODestroyed = new Subject();
  /** @type Subject<any> */
  onAllLevelUFODestroyed = new Subject();

  /** @type BehaviorSubject<Game.started> */
  gameStarted;
  /** @type BehaviorSubject<Game.pause> */
  gamePause;
  /** @type BehaviorSubject<Game.fail> */
  gameFail;
  /** @type BehaviorSubject<Game.win> */
  gameWin;

  /** @param { Game } game */
  constructor(game) {
    this.gameStarted = new BehaviorSubject(game.started);
    this.gamePause = new BehaviorSubject(game.pause);
    this.gameFail = new BehaviorSubject(game.fail);
    this.gameWin = new BehaviorSubject(game.win);
  }
}