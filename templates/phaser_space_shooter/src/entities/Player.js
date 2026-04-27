export const PLAYER_SPEED = 300;
export const PLAYER_FIRE_RATE = 200;
export const PLAYER_BULLET_SPEED = 500;

export class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.lastFired = 0;

    this._createShip();
    this._setupCollisions();
  }

  _createShip() {
    this.ship = this.scene.add.graphics();
    this.ship.fillStyle(0x00ff00, 1);
    this.ship.fillTriangle(20, 0, 0, 40, 40, 40);
    this.add(this.ship);

    this.setSize(40, 40);
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
  }

  _setupCollisions() {
    this.body.setImmovable(true);
  }

  setBullets(bullets) {
    this.bullets = bullets;
  }

  moveLeft() {
    this.body.setVelocityX(-PLAYER_SPEED);
  }

  moveRight() {
    this.body.setVelocityX(PLAYER_SPEED);
  }

  stopMoving() {
    this.body.setVelocityX(0);
  }

  shoot() {
    const bullet = this.bullets.get(this.x, this.y - 30);
    if (bullet) {
      bullet.body.setVelocityY(-PLAYER_BULLET_SPEED);
      bullet.setActive(true);
      bullet.setVisible(true);
    }
  }

  update(time, delta, keys) {
    if (keys.left.isDown) {
      this.moveLeft();
    } else if (keys.right.isDown) {
      this.moveRight();
    } else {
      this.stopMoving();
    }

    if (keys.space.isDown && time > this.lastFired + PLAYER_FIRE_RATE) {
      this.shoot();
      this.lastFired = time;
    }
  }
}