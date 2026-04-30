# phaser_space_shooter

## Entry Point
- `src/main.js` exports `createGame(parentElement)` - call this to mount the game

## Architecture
```
src/
├── main.js              # Entry point, exports createGame(parentElement)
├── GameConfig.js        # Game dimensions, physics, colors
├── scenes/
│   ├── BootScene.js     # Loading screen with progress bar
│   └── PlayScene.js     # Main gameplay (player, enemies, bullets, spawning, scoring)
├── entities/
│   ├── Player.js        # Container with programmatic ship graphics, arrow keys + spacebar
│   ├── Enemy.js         # Animated enemy with hit/destroy logic
│   └── Bullet.js        # Pooled bullet with velocity
└── managers/
    ├── ScoreManager.js  # Score tracking and display
    └── EnemySpawner.js  # Timed enemy spawning with increasing difficulty
```

## Key Patterns
- Player uses `GameObjects.Container` with a `Graphics` ship drawn programmatically
- Arcade physics for movement/collisions
- Object pooling via `physics.add.group` with `maxSize`
- Arrow keys move, spacebar shoots
- Game over restarts scene after 2s

## Dev Server
Run from repo root: `node scripts/serve-template.js phaser_space_shooter [port]`

## Notes
- No test/lint/typecheck infrastructure
- Uses pnpm
- No package.json at root - deps installed in template dir by serve script