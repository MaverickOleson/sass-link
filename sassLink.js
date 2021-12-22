#!/usr/bin/env node
{
    const fs = require('fs');
    const path = require('path');
    const chokidar = require('chokidar');

    var ready = false;

    fs.writeFileSync("styles.scss", '');
    chokidar.watch('.')
        .on('add', file => {
            if (/^_.+\.scss$/.test(path.basename(file))) {
                fs.writeFileSync("styles.scss", `@import '${file.replace(/\\/g, '/')}';\n`, { flag: 'a' });
                if (ready) console.log('\x1b[35mstyles.scss written successfully with links to partials!!!\033[0m');
            }
        })
        .on('unlink', file => {
            if (/^_.+\.scss$/.test(path.basename(file))) {
                fs.writeFileSync('styles.scss', fs.readFileSync('styles.scss', 'utf-8').split('\n').filter(line => line !== `@import '${file.replace(/\\/g, '/')}';`).reduce((a, c) => a + '\n' + c));
                if (ready) console.log('\x1b[35mstyles.scss written successfully with links to partials!!!\033[0m');
            }
        })
        .on('ready', () => {
            ready = true;
            console.log('\x1b[35mstyles.scss written successfully with links to partials!!!\033[0m');
        })
}