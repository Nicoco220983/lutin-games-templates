export class ScoreManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this._createText();
  }

  _createText() {
    this.text = this.scene.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      fill: '#fff'
    });
  }

  add(points) {
    this.score += points;
    this.text.setText(`Score: ${this.score}`);
  }

  reset() {
    this.score = 0;
    this.text.setText('Score: 0');
  }

  get() {
    return this.score;
  }
}