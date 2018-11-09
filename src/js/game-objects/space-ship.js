import * as PIXI from 'pixi.js';

export default class SpaceShip {
  static MOVE_STEP_SIZE = 0.1;

  sprite;
  container;
  app;
  UFOs = [];

  moveInterval = false;

  constructor(app) {
    this.app = app;

    this.sprite = this.container = PIXI.Sprite.fromImage('../../img/spaceArt/png/player.png');
    this.sprite.anchor.set(0.5);
    this.sprite.y = this.app.screen.height - 50;
    this.sprite.x = this.app.screen.width / 2;
  }

  addUFO(UFO) {
    this.UFOs.push(UFO);
    this.startMoveToNextUFO();
  }

  startMoveToNextUFO() {
    this.app.ticker.add((deltaTime) => {
      if (!this.UFOs[0]) {
        return;
      }
      const nextUFO = this.UFOs[0];

      if (Math.abs(this.container.x - nextUFO.container.x) <= (SpaceShip.MOVE_STEP_SIZE / 2)) {
        this.container.x = nextUFO.container.x;
        // TODO SHUT
        this.UFOs.shift();

        this.moveInterval = null;
        this.startMoveToNextUFO();
      } else {
        this.container.x += (SpaceShip.MOVE_STEP_SIZE * ((this.container.x > nextUFO.container.x) ? -1 : 1)) * deltaTime
      }
    })

  }

  destroy() {
    if (this.moveInterval) clearInterval(this.moveInterval);
  }

}