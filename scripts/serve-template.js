#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node serve-template.js <template_name> [port]');
    process.exit(1);
}

const templateName = args[0];
const port = args[1] || 8080;
const templateDir = path.join(__dirname, '..', 'templates', templateName);
const rootDir = path.join(__dirname, '..');

if (!fs.existsSync(templateDir)) {
    console.error(`Error: Template '${templateName}' not found in templates/`);
    process.exit(1);
}

const packageJsonPath = path.join(templateDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    console.log('Installing dependencies with pnpm...');
    execSync('pnpm install', { cwd: templateDir, stdio: 'inherit' });
}

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

function getIndexHtml(mainJsPath) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${templateName}</title>
    <style>
        body { margin: 0; padding: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
        canvas { display: block; }
    </style>
    <script type="importmap">
    {
        "imports": {
            "phaser": "https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.esm.min.js"
        }
    }
    </script>
</head>
<body>
    <script type="module">
        import { createGame } from '${mainJsPath}';
        createGame(document.body);
    </script>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    let filePath = path.join(templateDir, urlPath);

    if (urlPath === '/index.html') {
        const mainJsPath = '/src/main.js';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getIndexHtml(mainJsPath));
        return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, () => {
    console.log(`Starting webserver for template: ${templateName}`);
    console.log(`Serving at: http://localhost:${port}`);
});