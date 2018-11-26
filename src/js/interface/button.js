import * as PIXI from 'pixi.js';

const defBgColor = 0xEEEEEE;
const activeBgColor = 0xFFFFFF;
const lineColor = 0xa6e22e;

export default class Button extends PIXI.Sprite {

  /** @type PIXI.Text */
  text;

  /** @type Game */
  game;

  get clicked() {
    return this._cb;
  }
  set clicked(cb) {
    this._cb = cb;
  }
  _cb;

  constructor(text, cb, game) {
    super();
    this.game = game;
    this.create(text, cb);
  }

  create(text, cb) {
    // generate the texture
    let graphics = new PIXI.Graphics();
    graphics.beginFill(defBgColor, 1);
    graphics.lineStyle(4, lineColor, 1);
    graphics.moveTo(20, 0);
    graphics.lineTo(250, 0);
    graphics.lineTo(230, 50);
    graphics.lineTo(0, 50);
    graphics.lineTo(20, 0);
    graphics.endFill();
    this.texture = graphics.generateCanvasTexture();
    this.tint = defBgColor;

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.text = new PIXI.Text(text, 'arial');
    this.text.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this.text);

    this.interactive = true;
    this.buttonMode = true;
    this
      .on('mousedown', this.onDown)
      .on('mouseup', this.onUp)
      .on('mouseover', this.onHover)
      .on('mouseout', this.onOut);

    if (cb) this.clicked = cb;
  }

  onDown() {
    this.scale.x = .95;
    this.scale.y = .95;
    this.game.audioPlayer.playByPath('../../sounds/click.wav');
  }

  onUp() {
    if(typeof(this._cb) === 'function') {
      this._cb();
    }
    this.scale.x = 1;
    this.scale.y = 1;
  }

  onHover() {
    this.tint = activeBgColor;
    this.scale.x = 1.05;
    this.scale.y = 1.05;
    this.game.audioPlayer.playByPath('../../sounds/hover.wav');
  }

  onOut() {
    this.tint = defBgColor;
    this.scale.x = 1;
    this.scale.y = 1;
  }
}