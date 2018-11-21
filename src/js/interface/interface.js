import Button from "./button";
import Level from "../classes/level";

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
    this.generateDifficultyMenu();

    this.game.events.gamePause.subscribe(this.onGamePauseChangeHandler);
    this.game.events.gameStarted.subscribe(this.onGameStartedChangeHandler);
    this.game.events.gameFail.subscribe(this.onGameFailHandler);
    this.game.events.gameChoosingDifficulty.subscribe(this.onGameChoosingDifficultyHandler);
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

  onGameChoosingDifficultyHandler = (choosingDifficulty) => {
    this.gameDifficultyMenu.visible = choosingDifficulty;
  };

  generateStartMenu() {
    this.startMenu = new PIXI.Container();

    this.startMenu.addChild(this.getGrayBG());

    const button = new Button('Start', () => this.game.events.onNewGameClick.next());
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

    const newGameButton = new Button('New Game', () => this.game.events.onNewGameClick.next());
    newGameButton.y = this.game.interfaceContainer.height / 2 - 60;
    newGameButton.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(newGameButton);

    const restartLevelButton = new Button('Restart Level', () => this.game.events.onRestartLevelClick.next());
    restartLevelButton.y = this.game.interfaceContainer.height / 2;
    restartLevelButton.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(restartLevelButton);

    const continueButton = new Button('Continue', () => this.game.events.onPauseClick.next());
    continueButton.y = this.game.interfaceContainer.height / 2 + 60;
    continueButton.x = this.game.interfaceContainer.width / 2;
    this.pauseContainer.addChild(continueButton);

    const pauseUnderText = new PIXI.Text('... or press "Space" to continue', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 25,
    }));
    pauseUnderText.pivot.y = pauseUnderText.height / 2;
    pauseUnderText.pivot.x = pauseUnderText.width / 2;
    pauseUnderText.y = this.game.interfaceContainer.height / 2 + 110;
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

    const newGameButton = new Button('New Game', () => this.game.events.onNewGameClick.next());
    newGameButton.y = this.game.interfaceContainer.height / 2 - 60;
    newGameButton.x = this.game.interfaceContainer.width / 2;
    this.gameOverMenu.addChild(newGameButton);

    const restartButton = new Button('Restart Level', () => this.game.events.onRestartLevelClick.next());
    restartButton.y = this.game.interfaceContainer.height / 2;
    restartButton.x = this.game.interfaceContainer.width / 2;
    this.gameOverMenu.addChild(restartButton);

    this.game.interfaceContainer.addChild(this.gameOverMenu);
  }

  generateDifficultyMenu() {
    this.gameDifficultyMenu = new PIXI.Container();

    this.gameDifficultyMenu.addChild(this.getGrayBG());

    const gameOverText = new PIXI.Text('Select Difficulty of Game', new PIXI.TextStyle({
      fill: 'white',
      fontSize: 40,
    }));
    gameOverText.pivot.y = gameOverText.height / 2;
    gameOverText.pivot.x = gameOverText.width / 2;
    gameOverText.y = this.game.interfaceContainer.height / 2 - 180;
    gameOverText.x = this.game.interfaceContainer.width / 2;
    this.gameDifficultyMenu.addChild(gameOverText);

    const easyButton = new Button('Easy', () => this.game.events.onSelectDifficultyClick.next(Level.DIFFICULTY_OF_GAME.EASY));
    easyButton.y = this.game.interfaceContainer.height / 2 - 120;
    easyButton.x = this.game.interfaceContainer.width / 2;
    this.gameDifficultyMenu.addChild(easyButton);

    const normalButton = new Button('Normal', () => this.game.events.onSelectDifficultyClick.next(Level.DIFFICULTY_OF_GAME.NORMAL));
    normalButton.y = this.game.interfaceContainer.height / 2 - 60;
    normalButton.x = this.game.interfaceContainer.width / 2;
    this.gameDifficultyMenu.addChild(normalButton);

    const hardButton = new Button('Hard', () => this.game.events.onSelectDifficultyClick.next(Level.DIFFICULTY_OF_GAME.HARD));
    hardButton.y = this.game.interfaceContainer.height / 2;
    hardButton.x = this.game.interfaceContainer.width / 2;
    this.gameDifficultyMenu.addChild(hardButton);

    const mainMenuButton = new Button('Main Menu', () => this.game.events.onMainMenuClick.next());
    mainMenuButton.y = this.game.interfaceContainer.height / 2  + 60;
    mainMenuButton.x = this.game.interfaceContainer.width / 2;
    this.gameDifficultyMenu.addChild(mainMenuButton);

    this.game.interfaceContainer.addChild(this.gameDifficultyMenu);
  }

  getGrayBG() {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.interfaceContainer.width, this.game.interfaceContainer.height);
    background.endFill();
    return background;
  }
}