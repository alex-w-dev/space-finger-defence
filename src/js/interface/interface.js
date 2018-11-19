import Button from "./button";

export default class Interface {
  /** @type PIXI.Sprite */
  pauseContainer;
  /** @type PIXI.Sprite */
  gameOverMenu;
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
    this.generateGameOverMenu();

    this.game.events.gamePause.subscribe(this.onGamePauseChangeHandler);
    this.game.events.gameStarted.subscribe(this.onGameStartedChangeHandler);
    this.game.events.gameFail.subscribe(this.onGameFailHandler);
  }

  onGamePauseChangeHandler = (gamePause) => {
    this.pauseContainer.visible = gamePause;
  };

  onGameStartedChangeHandler = (started) => {
    this.startMenu.visible = !started;
  };

  onGameFailHandler = (fail) => {
    this.gameOverMenu.visible = fail;
  };

  generateStartMenu() {
    this.startMenu = new PIXI.Container();

    this.startMenu.addChild(this.getGrayBG());

    const button = new Button('Start', () => this.game.events.onGameStartClick.next(true));
    button.y = this.game.interfaceContainer.height / 2;
    button.x = this.game.interfaceContainer.width / 2;
    this.startMenu.addChild(button);

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
    pauseText.y = this.game.interfaceContainer.height / 2 - 120;
    pauseText.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(pauseText);

    const restartButton = new Button('Restart Level', () => this.game.events.onRestartLevelClick.next());
    restartButton.y = this.game.interfaceContainer.height / 2 - 60;
    restartButton.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(restartButton);

    const continueButton = new Button('Continue', () => this.game.events.onPauseClick.next());
    continueButton.y = this.game.interfaceContainer.height / 2;
    continueButton.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(continueButton);

    const pauseUnderText = new PIXI.Text('... or press "Space" to continue', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 25,
    }));
    pauseUnderText.pivot.y = pauseUnderText.height / 2;
    pauseUnderText.pivot.x = pauseUnderText.width / 2;
    pauseUnderText.y = this.game.interfaceContainer.height / 2 + 60;
    pauseUnderText.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(pauseUnderText);

    this.game.interfaceContainer.addChild(this.pauseContainer);
  }

  generateGameOverMenu() {
    this.gameOverMenu = new PIXI.Container();

    this.gameOverMenu.addChild(this.getGrayBG());

    const gameOverText = new PIXI.Text('GAME OVER', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    gameOverText.pivot.y = gameOverText.height / 2;
    gameOverText.pivot.x = gameOverText.width / 2;
    gameOverText.y = this.game.interfaceContainer.height / 2 - 120;
    gameOverText.x = this.game.interfaceContainer.width / 2;
    this.gameOverMenu.addChild(gameOverText);

    const restartButton = new Button('Restart Level', () => this.game.events.onRestartLevelClick.next());
    restartButton.y = this.game.interfaceContainer.height / 2 - 60;
    restartButton.x = this.game.interfaceContainer.width / 2;
    this.gameOverMenu.addChild(restartButton);

    this.game.interfaceContainer.addChild(this.gameOverMenu);
  }

  getGrayBG() {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.interfaceContainer.width, this.game.interfaceContainer.height);
    background.endFill();
    return background;
  }
}