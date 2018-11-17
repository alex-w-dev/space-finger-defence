import * as PIXI from 'pixi.js';
import Laser from './laser';

export default class SpaceShip {
  static MOVE_STEP_SIZE = 7;

  /** @type PIXI.Sprite */
  sprite;
  /** @type PIXI.Container */
  container;
  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;
  /** @type SpaceUFOTextChar[] */
  spaceUFOTextChars = [];

  /** @type PIXI.Texture */
  texturePlayer;
  /** @type PIXI.Texture */
  texturePlayerLeft;
  /** @type PIXI.Texture */
  texturePlayerRight;

  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.texturePlayer = new PIXI.Texture.fromImage('../../img/spaceArt/png/player.png');
    this.texturePlayerLeft = new PIXI.Texture.fromImage('../../img/spaceArt/png/playerLeft.png');
    this.texturePlayerRight = new PIXI.Texture.fromImage('../../img/spaceArt/png/playerRight.png');

    this.sprite = this.container = new PIXI.Sprite(this.texturePlayer);
    this.sprite.anchor.set(0.5);
    this.sprite.y = this.game.worldContainer.height - 50;
    this.sprite.x = this.game.worldContainer.width / 2;

    this.game.worldContainer.addChild(this.sprite);
    this.pixiApp.ticker.add(this.tick);
  }

  tick = (deltaTime) => {
    if (this.game.pause || !this.spaceUFOTextChars[0]) {
      return;
    }
    const spaceUFOTextChar = this.spaceUFOTextChars[0];

    if (Math.abs(this.container.x - spaceUFOTextChar.UFO.container.x) <= (SpaceShip.MOVE_STEP_SIZE / 2)) {
      this.container.x = spaceUFOTextChar.UFO.container.x;
      this.sprite.texture = this.texturePlayer;

      new Laser(this.game, new PIXI.Point(this.sprite.x, this.sprite.y - 40), spaceUFOTextChar);

      this.spaceUFOTextChars.shift();
    } else {
      const mx = (SpaceShip.MOVE_STEP_SIZE * ((this.container.x > spaceUFOTextChar.UFO.container.x) ? -1 : 1)) * deltaTime;

      if (mx > 0) {
        this.sprite.texture = this.texturePlayerRight;
      } else {
        this.sprite.texture = this.texturePlayerLeft;
      }

      this.container.x += mx;
    }
  };

  addTextChar(spaceUFOTextChar) {
    this.spaceUFOTextChars.push(spaceUFOTextChar);
  }

  destroy() {
    this.pixiApp.ticker.remove(this.tick);
    this.game.worldContainer.removeChild(this.sprite);

    this.sprite.destroy();
  }

}