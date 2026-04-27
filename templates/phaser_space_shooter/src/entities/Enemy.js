export const ENEMY_SPEED_MIN = 50;
export const ENEMY_SPEED_MAX = 150;
export const ENEMY_SPAWN_RATE = 1500;
export const ENEMY_POINTS = 100;

export class Enemy extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 30, 30, 0xff0000);
    this.scene = scene;
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this);
    this.body.setVelocityY(Phaser.Math.Between(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX));

    this.points = ENEMY_POINTS;
  }

  reset(x, y) {
    this.setPosition(x, y);
    this.body.setVelocityY(Phaser.Math.Between(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX));
    this.setActive(true);
    this.setVisible(true);
  }

  update() {
    if (this.y > this.scene.scale.height + 50) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  hit() {
    this.setActive(false);
    this.setVisible(false);
    return this.points;
  }
}