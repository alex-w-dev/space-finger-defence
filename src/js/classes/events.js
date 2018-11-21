import { Subject, BehaviorSubject } from 'rxjs';

export default class Events {
  onPauseClick = new Subject();
  onNewGameClick = new Subject();
  onUFOTouchedSpaceShip = new Subject();
  onNoMoreLevels = new Subject();
  onMainMenuClick = new Subject();
  onRestartLevelClick = new Subject();
  /** @type Subject<number> */
  onSelectDifficultyClick = new Subject();
  /** @type Subject<string> */
  onShootCharClick = new Subject();
  /** @type Subject<SpaceUFO> */
  onUFODestroyed = new Subject();
  /** @type Subject<any> */
  onLevelCompleted = new Subject();

  /** @type BehaviorSubject<Game.started> */
  gameStarted;
  /** @type BehaviorSubject<Game.pause> */
  gamePause;
  /** @type BehaviorSubject<Game.fail> */
  gameFail;
  /** @type BehaviorSubject<Game.win> */
  gameWin;
  /** @type BehaviorSubject<Game.choosingDifficulty> */
  gameChoosingDifficulty;

  /** @param { Game } game */
  constructor(game) {
    this.gameStarted = new BehaviorSubject(game.started);
    this.gamePause = new BehaviorSubject(game.pause);
    this.gameFail = new BehaviorSubject(game.fail);
    this.gameWin = new BehaviorSubject(game.win);
    this.gameChoosingDifficulty = new BehaviorSubject(game.choosingDifficulty);
  }
}