import * as PIXI from 'pixi.js';

/**
 * @typedef { Object } TextChar
 * @property { string } value
 * @property { boolean } checked
 * @property { PIXI.Text } pixiText
 * */

export default class SpaceUFO {
  static STEP_SIZE = 0.1;
  static OFFSET = 10;
  static CHAR_HEIGHT = 20;
  static CHAR_WIDTH = 20;
  //
  static ORIGINAL_SPRITE_WIDTH = 98;
  static ORIGINAL_SPRITE_HEIGHT = 50;

  /** @type PIXI.Sprite */
  UFOSprite;
  /** @type TextChar[] */
  textChars;
  /** @type PIXI.Container */
  container;
  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  static getSizeFromCharset(charset) {
    const width = charset.length * SpaceUFO.CHAR_WIDTH; // 9.8 * 4 ,

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
    this.textContainer.height = 20;

    this.textChars = charset.map((char, i) => {
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
        value: char,
        clicked: false,
        pixiText: pixiText,
      }
    });

    this.container.addChild(this.UFOSprite);
    this.container.addChild(this.textContainer);

    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    this.game.worldContainer.addChild(this.container);
    this.pixiApp.ticker.add(this.tick);
  }

  takeDamage() {
    this.destroy();
  }

  tick = (delta) => {
    if (this.game.pause) {
      return;
    }
    if (this.container.y > this.game.worldContainer.height - 100) {
      // TODO GamEOVER: FAIL
      return;
    }
    this.container.y += SpaceUFO.STEP_SIZE * delta;
  };

  destroy() {
    this.pixiApp.ticker.remove(this.tick);
    this.game.worldContainer.removeChild(this.container);

    this.sprite.destroy();
    this.container.destroy();
  }

  getFreeTextChar(char) {
    return this.textChars.find(textChar => textChar.value === char && !textChar.checked);
  }

  checkTextChar(textChar) {
    if (textChar.checked) return;

    textChar.checked = true;
  }
}