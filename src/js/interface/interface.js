import Button from "./button";
import Level from "../classes/level";

export default class Interface {
  /** @type PIXI.Sprite */
  pauseContainer;
  /** @type PIXI.Sprite */
  gameOverMenu;
  /** @type PIXI.Sprite */
  gameWinMenu;
  /** @type PIXI.Sprite */
  startMenu;
  /** @type PIXI.Sprite */
  levelWaitingContainer;
  /** @type PIXI.Text */
  levelWaitingWaveText;
  /** @type PIXI.Text */
  levelWaitingTimeLeft;
  /** @type PIXI.Text */
  scoreContainer;
  /** @type PIXI.Text */
  yourScoreText;
  /** @type PIXI.Text */
  topScoreText;


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
    this.generateGameWinMenu();
    this.generateLevelWaitingContainer();
    this.generateScoreContainer();

    this.yourScoreText = this._getText('Your Score: N');
    this.game.interfaceContainer.addChild(this.yourScoreText);
    this.topScoreText = this._getText('Top Score: N');
    this.game.interfaceContainer.addChild(this.topScoreText);
    this._renewFinalScore(false, 0);

    this.game.pause.subscribe(this.onGamePauseHandler);
    this.game.started.subscribe(this.onGameStartedHandler);
    this.game.fail.subscribe(this.onGameFailHandler);
    this.game.win.subscribe(this.onGameWinHandler);
    this.game.choosingDifficulty.subscribe(this.onGameChoosingDifficultyHandler);
    this.game.levelWaiting.subscribe(this.onGameLevelWaitingHandler);
    this.game.level.totalScore.subscribe(this.onLevelTotalScoreHandler);
  }

  onGamePauseHandler = (gamePause) => {
    this.pauseContainer.visible = gamePause;
  };

  onGameStartedHandler = (started) => {
    this.startMenu.visible = !started;
  };

  onGameFailHandler = (fail) => {
    this.gameOverMenu.visible = fail;

    this._renewFinalScore(fail, 60);
  };

  onGameWinHandler = (win) => {
    this.gameWinMenu.visible = win;

    this._renewFinalScore(win, 60);
  };

  onGameChoosingDifficultyHandler = (choosingDifficulty) => {
    this.gameDifficultyMenu.visible = choosingDifficulty;
  };

  onGameLevelWaitingHandler = (levelWaiting) => {
    if (levelWaiting !== 0) {
      this.levelWaitingContainer.visible = true;

      this.levelWaitingTimeLeft.text = `${levelWaiting}...`;
      this.levelWaitingWaveText.text = (this.game.level.number === Level.MAX_LEVEL)? 'FINAL WAVE': `WAVE ${this.game.level.number}`;
      this.levelWaitingWaveText.pivot.x = this.levelWaitingWaveText.width / 2;
    } else {
      this.levelWaitingContainer.visible = false;
    }
  };

  onLevelTotalScoreHandler = (totalScore) => {
    this.scoreContainer.text = `Score: ${totalScore}`
  };

  generateScoreContainer() {
    this.scoreContainer = this._getText('Score: 0');
    this.scoreContainer.pivot.y = 0;
    this.scoreContainer.pivot.x = 0;
    this.scoreContainer.y = 20;
    this.scoreContainer.x = 20;

    this.game.interfaceContainer.addChild(this.scoreContainer);
  }

  generateStartMenu() {
    this.startMenu = new PIXI.Container();

    this.startMenu.addChild(this._getGrayBG());

    const button = new Button('Start', () => this.game.events.onNewGameClick.next());
    button.y = this.game.interfaceContainer.height / 2;
    button.x = this.game.interfaceContainer.width / 2;
    this.startMenu.addChild(button);

    this.game.interfaceContainer.addChild(this.startMenu);
  }

  generateLevelWaitingContainer() {
    this.levelWaitingContainer = new PIXI.Container();

    this.levelWaitingContainer.addChild(this._getGrayBG());

    this.levelWaitingWaveText = this._getText('Wave N', 40);
    this.levelWaitingWaveText.y = this.game.interfaceContainer.height / 2 - 60;
    this.levelWaitingContainer.addChild(this.levelWaitingWaveText);

    this.levelWaitingTimeLeft = this._getText('N ...');
    this.levelWaitingTimeLeft.y = this.game.interfaceContainer.height / 2;
    this.levelWaitingContainer.addChild(this.levelWaitingTimeLeft);

    this.game.interfaceContainer.addChild(this.levelWaitingContainer);
  }

  generatePauseContainer() {
    this.pauseContainer = new PIXI.Container();

    this.pauseContainer.addChild(this._getGrayBG());

    const pauseText = this._getText('PAUSE', 40);
    pauseText.y = this.game.interfaceContainer.height / 2 - 120;
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

    const pauseUnderText = this._getText('... or press "Space"');
    pauseUnderText.y = this.game.interfaceContainer.height / 2 + 110;
    this.pauseContainer.addChild(pauseUnderText);

    this.game.interfaceContainer.addChild(this.pauseContainer);
  }

  generateGameOverMenu() {
    this.gameOverMenu = new PIXI.Container();

    this.gameOverMenu.addChild(this._getGrayBG());

    const gameOverText = this._getText('GAME OVER', 40);
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

  generateGameWinMenu() {
    this.gameWinMenu = new PIXI.Container();

    this.gameWinMenu.addChild(this._getGrayBG());

    const congratulationText = this._getText('!!! CONGRATULATION !!!', 40);
    congratulationText.y = this.game.interfaceContainer.height / 2 - 120;
    this.gameWinMenu.addChild(congratulationText);

    const youWinText = this._getText('You Win.', 40);
    youWinText.y = this.game.interfaceContainer.height / 2 - 60;
    this.gameWinMenu.addChild(youWinText);

    const newGameButton = new Button('New Game', () => this.game.events.onNewGameClick.next());
    newGameButton.y = this.game.interfaceContainer.height / 2;
    newGameButton.x = this.game.interfaceContainer.width / 2;
    this.gameWinMenu.addChild(newGameButton);

    this.game.interfaceContainer.addChild(this.gameWinMenu);
  }

  generateDifficultyMenu() {
    this.gameDifficultyMenu = new PIXI.Container();

    this.gameDifficultyMenu.addChild(this._getGrayBG());

    const gameOverText = this._getText('Select Difficulty of Game', 40);
    gameOverText.y = this.game.interfaceContainer.height / 2 - 180;
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

  _getText(text, fontSize = 25) {
    const smallText = new PIXI.Text(text, new PIXI.TextStyle({
      fill: 'white',
      fontSize,
    }));
    smallText.pivot.y = smallText.height / 2;
    smallText.pivot.x = smallText.width / 2;
    smallText.y = this.game.interfaceContainer.height / 2;
    smallText.x = this.game.interfaceContainer.width / 2;
    return smallText;
  }

  _getGrayBG() {
    const background = new PIXI.Graphics();
    background.beginFill(0x000000, .5);
    background.drawRect(0, 0, this.game.interfaceContainer.width, this.game.interfaceContainer.height);
    background.endFill();
    return background;
  }

  _renewFinalScore(visible, marginTop) {
    this.yourScoreText.text = `Your Score: ${ this.game.level.totalScore.getValue() }`;
    this.yourScoreText.visible = visible;
    this.yourScoreText.pivot.x = this.yourScoreText.width / 2;
    this.yourScoreText.y = this.game.interfaceContainer.height / 2 + marginTop;

    this.topScoreText.text = `Top Score: ${ this.game.level.topScore }`;
    this.topScoreText.visible = visible;
    this.topScoreText.pivot.x = this.topScoreText.width / 2;
    this.topScoreText.y = this.game.interfaceContainer.height / 2 + marginTop + 40;
  }
}