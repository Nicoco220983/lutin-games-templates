# Agents

## Repo Structure
- `templates/<name>/` - each template is a standalone project
- `scripts/` - utility scripts for managing templates
- `all-lutin-configs.json` - auto-generated aggregate of all template configs (rebuild with `node scripts/build-all-lutin-configs.js`)

## Key Commands
```bash
# Serve a template locally (installs deps with pnpm if needed)
node scripts/serve-template.js <template_name> [port]

# Aggregate all lutin-config.json files into all-lutin-configs.json
node scripts/build-all-lutin-configs.js
```

## Template Anatomy (phaser_space_shooter)
- Entry: `src/main.js` exports `createGame(parentElement)` function
- Config: `src/GameConfig.js` (width, height, physics)
- Scenes: `src/scenes/` (BootScene → PlayScene)
- Entities: `src/entities/` (Player, Enemy, Bullet)
- Managers: `src/managers/` (ScoreManager, EnemySpawner)

## Notes
- Templates have no test/lint/typecheck infrastructure
- Templates use pnpm for dependency management
- The `all-lutin-configs.json` is generated, not manually edited