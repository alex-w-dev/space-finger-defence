const PIXI = require('../lib/pixi/pixi');

export default class SpaceUFO {
  static OFFSET = 10;

  sprite;
  app;

  static getSizeFromCharset(charset) {
    return {
      width: charset.length * 19.6,
      height: charset.length * 10,
    }
  }

  constructor(app, charset) {
    this.app = app;

    this.sprite = PIXI.Sprite.fromImage('../../img/spaceArt/png/enemyShip.png');
    this.sprite.anchor.set(0.5);

    const size = SpaceUFO.getSizeFromCharset(charset);

    this.sprite.width = size.width;
    this.sprite.height = size.height;

    this.sprite.y = 50;
    this.sprite.x = app.screen.width / 2;
  }

  moveForward() {
    this.sprite.y += 50;
  }

  destroy() {
  }

}