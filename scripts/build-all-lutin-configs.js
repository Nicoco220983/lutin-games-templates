#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'templates');
const outputPath = path.join(__dirname, '..', 'all-lutin-configs.json');

const configs = {};

if (!fs.existsSync(templatesDir)) {
    console.error('Error: templates/ directory not found');
    process.exit(1);
}

const templateDirs = fs.readdirSync(templatesDir);

for (const templateKey of templateDirs) {
    const configPath = path.join(templatesDir, templateKey, 'lutin-config.json');
    if (fs.existsSync(configPath)) {
        configs[templateKey] = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
}

fs.writeFileSync(outputPath, JSON.stringify(configs, null, 2));
console.log(`Written ${Object.keys(configs).length} configs to ${outputPath}`);