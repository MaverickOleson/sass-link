#!/usr/bin/env node
exports.linkSass = () => {
    const fs = require('fs');
    const readline = require('readline');
    const path = require('path');
    const chokidar = require('chokidar');
    const sass = require('sass');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var ready = false;

    function getCSSFile() {
        rl.question('Name of your css file: ', function (name) {
            if (name == '') getCSSFile();
            else {
                chokidar.watch('.')
                    .on('ready', () => {
                        ready = true;
                        console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                    })
                    .on('add', file => {
                        if (/^_.+\.scss$/.test(path.basename(file))) {
                            fs.writeFileSync(name, `${sass.compileString(fs.readFileSync(file, 'utf-8')).css}\n`, { flag: 'a' });
                            if (ready) console.log('\x1b[35mstyles.scss written successfully with links to partials!!!\033[0m');
                        }
                    })
                    .on('unlink', file => {
                        if (/^_.+\.scss$/.test(path.basename(file))) {
                            fs.writeFileSync(name, sass.compileString(fs.readFileSync(file, 'utf-8')).css);
                            if (ready) console.log('\x1b[35mstyles.scss written successfully with links to partials!!!\033[0m');
                        }
                    })
                rl.close();
            }
        });
    }
    getCSSFile();
}
exports.linkSass();