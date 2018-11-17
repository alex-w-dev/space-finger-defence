import { Subject } from 'rxjs';
import Game from "./game";

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

      if (Game.CHOOT_CHARS.includes(e.key.toLowerCase())) {
        return game.events.onShootCharClick.next(e.key.toLowerCase());
      }
    };
  }
}