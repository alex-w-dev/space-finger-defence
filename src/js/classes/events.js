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
}