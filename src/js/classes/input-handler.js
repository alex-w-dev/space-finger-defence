import { Subject } from 'rxjs';

export default class InputHandler {
  static spaceCode = 'Space';
  static enterCode = 'Enter';

  /** @param { Game } game */
  constructor(game) {
    window.onkeydown = (e) => {
      if (e.code === InputHandler.spaceCode) {
        return game.events.onPauseClick.next();
      }

      if (e.code === InputHandler.enterCode) {
        return game.events.onGameStartClick.next();
      }
    };
  }
}