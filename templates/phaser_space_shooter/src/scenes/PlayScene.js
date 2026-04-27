import { GAME_WIDTH } from '../GameConfig.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { Bullet } from '../entities/Bullet.js';
import { EnemySpawner } from '../managers/EnemySpawner.js';
import { ScoreManager } from '../managers/ScoreManager.js';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.player = null;
    this.bullets = null;
    this.enemies = null;
    this.spawner = null;
    this.scoreManager = null;
  }

  create() {
    this._createGroups();
    this._createPlayer();
    this._createSpawner();
    this._createScoreManager();
    this._setupCollisions();
  }

  _createGroups() {
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true
    });

    this.enemies = this.physics.add.group({
      classType: Enemy,
      maxSize: 20,
      runChildUpdate: true
    });
  }

  _createPlayer() {
    this.player = new Player(this, GAME_WIDTH / 2, this.scale.height - 80);
    this.player.setBullets(this.bullets);
  }

  _createSpawner() {
    this.spawner = new EnemySpawner(this);
  }

  _createScoreManager() {
    this.scoreManager = new ScoreManager(this);
  }

  _setupCollisions() {
    this.physics.add.overlap(this.bullets, this.enemies, this._onBulletHitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this._onPlayerHitEnemy, null, this);
  }

  _onBulletHitEnemy(bullet, enemy) {
    const points = enemy.hit();
    this.scoreManager.add(points);
  }

  _onPlayerHitEnemy(player, enemy) {
    enemy.hit();
    this._gameOver();
  }

  _gameOver() {
    this.spawner.stop();
    this.physics.pause();
    this.add.text(GAME_WIDTH / 2, this.scale.height / 2, 'GAME OVER', {
      fontSize: '48px',
      fill: '#ff0000'
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.scene.restart();
      this.scoreManager.reset();
    });
  }

  update(time, delta) {
    this.player.update(time, delta, this.input.keyboard.createCursorKeys());
  }
}