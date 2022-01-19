#!/usr/bin/env node
exports.link = () => {
    const fs = require('fs');
    const readline = require('readline');
    const path = require('path');
    const chokidar = require('chokidar');
    const sass = require('sass');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const css = {};

    var ready = false;

    function compile(name) {
        if (name == '' || name == undefined) rl.question('Name of your css file: ', (input) => compile(input));
        else {
            if (!/.+\.css/.test(name)) { name = `${name}.css` };
            chokidar.watch('.')
                .on('ready', () => {
                    ready = true;
                    console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                })
                .on('change', file => {
                    if (/^_.+\.scss$/.test(path.basename(file))) {
                        css[path.basename(file)] = `${sass.compileString(fs.readFileSync(file, 'utf-8')).css}\n`;
                        fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                        console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                    }
                })
                .on('add', file => {
                    if (/^_.+\.scss$/.test(path.basename(file))) {
                        css[path.basename(file)] = `${sass.compileString(fs.readFileSync(file, 'utf-8')).css}\n`;
                        fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                        if (ready) console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                    }
                })
                .on('unlink', file => {
                    if (/^_.+\.scss$/.test(path.basename(file))) {
                        delete css[path.basename(file)];
                        fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                        if (ready) console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                    }
                })
            rl.close();
        }
    }
    compile(process.argv[2]);
}
exports.link();