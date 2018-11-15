export default class Interface {
  /** @type PIXI.Sprite */
  pauseContainer;


  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.generatePauseContainer();

    this.game.events.gamePause.subscribe(this.onGamePauseChangeHandler)
  }

  onGamePauseChangeHandler = (gamePause) => {
    this.pauseContainer.visible = gamePause;
  };

  generatePauseContainer() {
    this.pauseContainer = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.pixiApp.screen.width, this.game.pixiApp.screen.height);
    background.endFill();
    this.pauseContainer.addChild(background);

    const pauseText = new PIXI.Text('PAUSE', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    pauseText.pivot.y = pauseText.height / 2;
    pauseText.pivot.x = pauseText.width / 2;
    pauseText.y = this.game.pixiApp.screen.height / 2;
    pauseText.x = this.game.pixiApp.screen.width / 2;
    this.pauseContainer.addChild(pauseText);

    this.game.interfaceContainer.addChild(this.pauseContainer);
  }
}