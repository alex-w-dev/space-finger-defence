import { Subject } from 'rxjs';
import Game from "./game";

export default class InputHandler {
  static spaceCode = 'Space';
  static escapeCode = 'Escape';

  /** @param { Game } game */
  constructor(game) {
    window.onkeydown = (e) => {
      // console.log(e, 'e');
      if (e.code === InputHandler.spaceCode || e.code === InputHandler.escapeCode) {
        return game.events.onPauseClick.next();
      }

      if (Game.CHOOT_CHARS.includes(e.key.toLowerCase())) {
        return game.events.onShootCharClick.next(e.key.toLowerCase());
      }
    };
  }
}