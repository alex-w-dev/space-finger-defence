import { Subject } from 'rxjs';

export default class InputHandler {
  static spaceCode = 'Space';

  onSpaceClick = new Subject();

  constructor() {
    window.onkeydown = (e) => {
      if (e.code === InputHandler.spaceCode) {
        return this.onSpaceClick.next();
      }
    }
  }
}