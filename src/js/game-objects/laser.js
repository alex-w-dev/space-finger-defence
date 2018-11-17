import * as PIXI from 'pixi.js';

export default class Laser {
  static SPEED = 2;

  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;
  /** @type PIXI.Sprite */
  sprite;
  /** @type SpaceUFOTextChar */
  spaceUFOTextChar;

  /** @type PIXI.Texture */
  textureFly;
  /** @type PIXI.Texture */
  textureShot;

  constructor(game, point, spaceUFOTextChar) {
    this.game = game;
    this.pixiApp = game.pixiApp;
    this.spaceUFOTextChar = spaceUFOTextChar;

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

    if (this.spaceUFOTextChar.UFO.destroyed) {
      this.destroy();
      return;
    }

    this.sprite.y -= (Laser.SPEED * delta);

    if (Math.abs(this.sprite.y - this.spaceUFOTextChar.UFO.container.y) < 10) {
      this.spaceUFOTextChar.UFO.takeDamage();
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