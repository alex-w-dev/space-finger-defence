import * as PIXI from 'pixi.js';

export default class Laser {
  static SPEED = 2;

  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;
  /** @type PIXI.Sprite */
  sprite;
  /** @type UFO */
  UFO;

  /** @type PIXI.Texture */
  textureFly;
  /** @type PIXI.Texture */
  textureShot;

  constructor(game, point, UFO) {
    this.game = game;
    this.pixiApp = game.pixiApp;
    this.UFO = UFO;

    this.textureFly = PIXI.Texture.fromImage('../../img/spaceArt/png/laserRed.png');
    this.textureShot = PIXI.Texture.fromImage('../../img/spaceArt/png/laserRedShot.png');

    this.sprite = new PIXI.Sprite(this.textureFly);
    this.sprite.anchor.set(.5);
    this.sprite.x = point.x;
    this.sprite.y = point.y;

    this.game.worldContainer.addChild(this.sprite);

    this.pixiApp.ticker.add(this.tick);
  }

  tick = (delta) => {
    if (this.game.pause) {
      return;
    }
    this.sprite.y -= (Laser.SPEED * delta);

    if (Math.abs(this.sprite.y - this.UFO.container.y) < 10) {
      this.UFO.takeDamage();
      this.destroy();
    }
  };

  destroy() {
    this.sprite.texture = this.textureShot;
    this.pixiApp.ticker.remove(this.tick);

    setTimeout(() => {
      this.game.worldContainer.removeChild(this.sprite);

      this.sprite.destroy();
    }, 300);
  }
}