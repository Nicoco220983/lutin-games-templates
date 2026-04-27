export const BULLET_SPEED = 500;

export class Bullet extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 4, 15, 0xffff00);
    this.scene = scene;
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.body.setVelocityY(-BULLET_SPEED);

    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    if (this.y < -50) {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }

  reset(x, y) {
    this.setPosition(x, y);
    this.body.setVelocityY(-BULLET_SPEED);
    this.setActive(true);
    this.setVisible(true);
  }
}