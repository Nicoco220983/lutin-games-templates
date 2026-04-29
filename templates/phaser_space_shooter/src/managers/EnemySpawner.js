import { Math } from 'phaser';
import { ENEMY_SPEED_MIN, ENEMY_SPEED_MAX, ENEMY_SPAWN_RATE } from '../entities/Enemy.js';

export class EnemySpawner {
  constructor(scene) {
    this.scene = scene;
    this.enemies = scene.enemies;
    this.timer = scene.time.addEvent({
      delay: ENEMY_SPAWN_RATE,
      callback: this.spawn,
      callbackScope: this,
      loop: true
    });
  }

  spawn() {
    const width = this.scene.scale.width;
    const x = Math.Between(50, width - 50);
    const enemy = this.enemies.get(x, -50);
    if (enemy) {
      enemy.reset(x, -50);
      enemy.body.setVelocityY(Math.Between(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX));
      enemy.setActive(true);
      enemy.setVisible(true);
    }
  }

  stop() {
    this.timer.destroy();
  }
}