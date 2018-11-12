import * as PIXI from 'pixi.js';

export default class Laser {
  static SPEED = 2;

  app;
  sprite;

  constructor(app, point) {
    this.app = app;

    this.sprite = PIXI.Sprite.fromImage('../../img/spaceArt/png/laserRed.png');
    this.sprite.anchor.set(.5);
    this.sprite.x = point.x;
    this.sprite.y = point.y;

    this.app.stage.addChild(this.sprite);

    this.app.ticker.add((delta) => {
      this.sprite.y -= (Laser.SPEED * delta)
    })
  }

  destroy() {
    this.app.removeChild(this.sprite);

    this.sprite.destroy();
  }
}