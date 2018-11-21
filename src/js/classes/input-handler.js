import { Subject } from 'rxjs';
import Game from "./game";

export default class InputHandler {
  static spaceCode = 'Space';
  static escapeCode = 'Escape';

  /** @param { Game } game */
  constructor(game) {
    const keyCodesToShootChar = Game.CHOOT_CHARS.map((char) => {
      return {
        char,
        eventCode: `Key${char.toUpperCase()}`,
      }
    });

    window.onkeydown = (e) => {
      // console.log(e, 'e');
      if (e.code === InputHandler.spaceCode || e.code === InputHandler.escapeCode) {
        return game.events.onPauseClick.next();
      }

      const keyToChar = keyCodesToShootChar.find(ktc => e.code === ktc.eventCode);
      if (keyToChar) {
        return game.events.onShootCharClick.next(keyToChar.char);
      }
    };
  }
}