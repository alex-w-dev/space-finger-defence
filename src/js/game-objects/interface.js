export default class Interface {
  /** @type PIXI.Sprite */
  pauseContainer;
  /** @type PIXI.Sprite */
  startMenu;


  /** @type Game */
  game;
  /** @type PIXI.Application */
  pixiApp;

  constructor(game) {
    this.game = game;
    this.pixiApp = game.pixiApp;

    this.generatePauseContainer();
    this.generateStartMenu();

    this.game.events.gamePause.subscribe(this.onGamePauseChangeHandler);
    this.game.events.gameStarted.subscribe(this.onGameStartedChangeHandler);
  }

  onGamePauseChangeHandler = (gamePause) => {
    this.pauseContainer.visible = gamePause;
  };

  onGameStartedChangeHandler = (started) => {
    this.startMenu.visible = !started;
  };

  generateStartMenu() {
    this.startMenu = new PIXI.Container();

    this.startMenu.addChild(this.getGrayBG());

    const pauseText = new PIXI.Text('START', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    pauseText.pivot.y = pauseText.height / 2;
    pauseText.pivot.x = pauseText.width / 2;
    pauseText.y = this.game.pixiApp.screen.height / 2;
    pauseText.x = this.game.pixiApp.screen.width / 2;
    this.startMenu.addChild(pauseText);

    this.game.interfaceContainer.addChild(this.startMenu);
  }

  generatePauseContainer() {
    this.pauseContainer = new PIXI.Container();

    this.pauseContainer.addChild(this.getGrayBG());

    const pauseText = new PIXI.Text('PAUSE', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    pauseText.pivot.y = pauseText.height / 2;
    pauseText.pivot.x = pauseText.width / 2;
    pauseText.y = this.game.pixiApp.screen.height / 2;
    pauseText.x = this.game.pixiApp.screen.width / 2;
    this.pauseContainer.addChild(pauseText);

    const pauseUnderText = new PIXI.Text('Press "Space" to continue', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 25,
    }));
    pauseUnderText.pivot.y = pauseUnderText.height / 2;
    pauseUnderText.pivot.x = pauseUnderText.width / 2;
    pauseUnderText.y = this.game.pixiApp.screen.height / 2 + 40;
    pauseUnderText.x = this.game.pixiApp.screen.width / 2;
    this.pauseContainer.addChild(pauseUnderText);

    this.game.interfaceContainer.addChild(this.pauseContainer);
  }

  getGrayBG() {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.pixiApp.screen.width, this.game.pixiApp.screen.height);
    background.endFill();
    return background;
  }
}