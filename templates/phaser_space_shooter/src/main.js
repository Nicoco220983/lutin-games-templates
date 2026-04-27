import { GAME_WIDTH, GAME_HEIGHT, BACKGROUND_COLOR, PHYSICS_GRAVITY_Y, PHYSICS_DEBUG } from './GameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { PlayScene } from './scenes/PlayScene.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: BACKGROUND_COLOR,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: PHYSICS_GRAVITY_Y },
      debug: PHYSICS_DEBUG
    }
  },
  scene: [BootScene, PlayScene]
};

export function createGame(parentElement) {
  return new Phaser.Game({ ...config, parent: parentElement });
}