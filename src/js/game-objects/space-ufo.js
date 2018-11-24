import * as PIXI from 'pixi.js';
import Level from "../classes/level";

/**
 * @typedef { Object } SpaceUFOTextChar
 * @property { string } char
 * @property { boolean } marked
 * @property { boolean } caught
 * @property { PIXI.Text } pixiText
 * @property { SpaceUFO } UFO
 * */

export default class SpaceUFO {
  static STEP_SIZE = .1;
  static OFFSET = 10;
  static CHAR_HEIGHT = 20;
  static CHAR_WIDTH = 20;
  //
  static ORIGINAL_SPRITE_WIDTH = 98;
  static ORIGINAL_SPRITE_HEIGHT = 50;

  /** @type PIXI.Sprite */
  UFOSprite;
  /** @type SpaceUFOTextChar[] */
  spaceUFOTextChars;
  /** @type PIXI.Container */
  container;
  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;
  /** @type boolean */
  destroyedBySpaceShip;
  /** @type number */
  worldY;

  static getSizeFromCharset(charset) {
    // const width = charset.length * SpaceUFO.CHAR_WIDTH; // 9.8 * 4 ,
    const width = SpaceUFO.ORIGINAL_SPRITE_WIDTH;

    const height = SpaceUFO.CHAR_HEIGHT + ((width / SpaceUFO.ORIGINAL_SPRITE_WIDTH) * SpaceUFO.ORIGINAL_SPRITE_HEIGHT);
    return {
      width: width,
      height: height,
    }
  }

  constructor(game, charset) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    const size = SpaceUFO.getSizeFromCharset(charset);

    this.container = this.sprite = new PIXI.Container();

    this.UFOSprite = PIXI.Sprite.fromImage('../../img/spaceArt/png/enemyShip.png');
    // this.UFOSprite.anchor.set(0.5);
    this.UFOSprite.x = 0;
    this.UFOSprite.y = 0;
    this.UFOSprite.width = size.width;
    this.UFOSprite.height = size.height - SpaceUFO.CHAR_HEIGHT;

    this.textContainer = new PIXI.Container();
    this.textContainer.x = this.textContainer.y = 0;
    this.textContainer.width = size.width;
    this.textContainer.height = SpaceUFO.CHAR_HEIGHT;

    this.spaceUFOTextChars = charset.map((char, i) => {
      const textStyle = new PIXI.TextStyle({
        align: 'center',
        fill: 'black',
        fontSize: 20,
        lineHeight: 20,
      });
      const pixiText = new PIXI.Text(char, textStyle);
      pixiText.anchor.set(.5, 0);
      pixiText.y = this.UFOSprite.height;
      pixiText.x = SpaceUFO.CHAR_WIDTH * i + SpaceUFO.CHAR_WIDTH / 2;

      this.textContainer.addChild(pixiText);
      return {
        char: char,
        clicked: false,
        pixiText: pixiText,
        UFO: this,
      }
    });

    this.container.addChild(this.UFOSprite);
    this.container.addChild(this.textContainer);

    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    this.game.worldContainer.addChild(this.container);
    this.pixiApp.ticker.add(this.tick);
  }

  /** @param { Laser } laser*/
  takeDamage(laser) {
    laser.spaceUFOTextChar.caught = true;
    if (this.spaceUFOTextChars.every((spaceUFOTextChar) => spaceUFOTextChar.caught)) {
      this.destroy(true);
    }
  }

  tick = (delta) => {
    if (this.game.isWorldFrozen()) {
      return;
    }
    if (this.worldY > this.game.worldContainer.height - 100) {
      this.game.events.onUFOTouchedSpaceShip.next();
      return;
    }
    this.setWorldY(this.worldY + (SpaceUFO.STEP_SIZE + (this.game.level.number / Level.MAX_LEVEL) / 2) * delta)
  };

  setWorldY(y) {
    this.container.y = this.worldY = y;
  }

  setWorldX(x) {
    this.container.x = x;
  }

  destroy(destroyedBySpaceShip = false) {
    this.pixiApp.ticker.remove(this.tick);
    this.game.worldContainer.removeChild(this.container);

    this.sprite.destroy();
    this.container.destroy();

    this.destroyedBySpaceShip = destroyedBySpaceShip;
    this.game.events.onUFODestroyed.next(this);
  }

  getFreeTextChar(char) {
    return this.spaceUFOTextChars.find(spaceUFOTextChar => spaceUFOTextChar.char === char && !spaceUFOTextChar.marked);
  }

  /** @param { SpaceUFOTextChar } spaceUFOTextChar */
  markTextChar(spaceUFOTextChar) {
    if (spaceUFOTextChar.marked) return;

    spaceUFOTextChar.marked = true;
    spaceUFOTextChar.pixiText.style.fill = 0xbbbbbb;
  }
}