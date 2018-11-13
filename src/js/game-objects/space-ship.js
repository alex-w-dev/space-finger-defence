import * as PIXI from 'pixi.js';
import Laser from './laser';

export default class SpaceShip {
  static MOVE_STEP_SIZE = 7;

  sprite;
  container;
  app;
  UFOs = [];

  texturePlayer;
  texturePlayerLeft;
  texturePlayerRight;

  constructor(app) {
    this.app = app;

    this.texturePlayer = new PIXI.Texture.fromImage('../../img/spaceArt/png/player.png');
    this.texturePlayerLeft = new PIXI.Texture.fromImage('../../img/spaceArt/png/playerLeft.png');
    this.texturePlayerRight = new PIXI.Texture.fromImage('../../img/spaceArt/png/playerRight.png');

    this.sprite = this.container = new PIXI.Sprite(this.texturePlayer);
    this.sprite.anchor.set(0.5);
    this.sprite.y = this.app.screen.height - 50;
    this.sprite.x = this.app.screen.width / 2;

    this.app.stage.addChild(this.sprite);
    this.app.ticker.add(this.tick);
  }

  tick = (deltaTime) => {
    if (!this.UFOs[0]) {
      return;
    }
    const nextUFO = this.UFOs[0];

    if (Math.abs(this.container.x - nextUFO.container.x) <= (SpaceShip.MOVE_STEP_SIZE / 2)) {
      this.container.x = nextUFO.container.x;
      this.sprite.texture = this.texturePlayer;

      new Laser(this.app, new PIXI.Point(this.sprite.x, this.sprite.y - 40), nextUFO);

      this.UFOs.shift();
    } else {
      const mx = (SpaceShip.MOVE_STEP_SIZE * ((this.container.x > nextUFO.container.x) ? -1 : 1)) * deltaTime;

      if (mx > 0) {
        this.sprite.texture = this.texturePlayerRight;
      } else {
        this.sprite.texture = this.texturePlayerLeft;
      }

      this.container.x += mx;
    }
  };

  addUFO(UFO) {
    this.UFOs.push(UFO);
  }

  destroy() {
    this.app.ticker.remove(this.tick);
    this.app.stage.removeChild(this.sprite);

    this.sprite.destroy();
  }

}