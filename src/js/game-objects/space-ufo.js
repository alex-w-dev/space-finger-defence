import * as PIXI from 'pixi.js';

export default class SpaceUFO {
  static STEP_SIZE = 0.6;
  static OFFSET = 10;
  static CHAR_HEIGHT = 20;
  static CHAR_WIDTH = 20;
  //
  static ORIGINAL_SPRITE_WIDTH = 98;
  static ORIGINAL_SPRITE_HEIGHT = 50;

  UFOSprite;
  textChars;
  container;
  app;

  static getSizeFromCharset(charset) {
    const width = charset.length * SpaceUFO.CHAR_WIDTH; // 9.8 * 4 ,

    const height = SpaceUFO.CHAR_HEIGHT + ((width / SpaceUFO.ORIGINAL_SPRITE_WIDTH) * SpaceUFO.ORIGINAL_SPRITE_HEIGHT);
    return {
      width: width,
      height: height,
    }
  }

  constructor(app, charset) {
    this.app = app;

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
    this.container.y = 50;
    this.container.x = app.screen.width / 2;

    this.app.ticker.add(this.tick);

    this.app.stage.addChild(this.container);
  }

  takeDamage() {
    this.destroy();
  }

  tick = (delta) => {
    if (this.container.y > this.app.screen.height - 100) {
      // TODO game over: FAIL
      return;
    }
    this.container.y += SpaceUFO.STEP_SIZE * delta;
  };

  destroy() {
    this.app.ticker.remove(this.tick);
    this.app.stage.removeChild(this.container);

    this.sprite.destroy();
    this.container.destroy();
  }

}