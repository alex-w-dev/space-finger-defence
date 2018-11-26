export default class AudioPlayer {
  /** @type number */
  volume = .1;

  /** @type Game */
  game;

  constructor(game) {
    this.game = game;
  }

  playByPath(path) {
    const audio = new Audio(path);
    audio.volume = this.volume;
    audio.play();
  }
}