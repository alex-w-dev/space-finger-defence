const PIXI = require('../lib/pixi/pixi');

export default class SpaceShip {
  sprite;
  app;
  goals = [];

  moveInterval = false;

  constructor(app) {
    this.app = app;

    this.sprite = PIXI.Sprite.fromImage('../../img/spaceArt/png/player.png');
    this.sprite.anchor.set(0.5);
    this.sprite.y = this.app.screen.height - 50;
    this.sprite.x = this.app.screen.width / 2;
  }

  addGoal(sprite) {
    this.goals.push(sprite);
    this.moveToNextGoal();
  }

  startMoveToGoal(sprite) {
    if (this.moveInterval || !sprite) return;

    this.moveInterval = setInterval(() => {
      // const stepSize = (this.goals.length || 1) * 3;


      if (true) {
        clearInterval(this.moveInterval);
        this.moveToNextGoal();
      }
    }, 100);



  }

  moveToNextGoal() {
    if (this.moveInterval || !this.goals.length) return;

    this.startMoveToGoal(this.goals.shift());
  }

  destroy() {
    if (this.moveInterval) clearInterval(this.moveInterval);
  }

}