{
    const fs = require('fs');
    const readline = require('readline');
    const path = require('path');
    const chokidar = require('chokidar');
    const sass = require('sass');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    exports.link = (name) => {
        const css = {};

        function compile(name) {
            if (name == '' || name == undefined) rl.question('Name of your css file: ', (input) => compile(input));
            else {
                if (!/.+\.css/.test(name)) { name = `${name}.css` };
                chokidar.watch('.')
                    .on('ready', () => {
                        console.log('SassLink is watching for changes. Press Ctrl-C to stop.\n');
                    })
                    .on('change', file => {
                        if (/^_.+\.scss$/.test(path.basename(file))) {
                            try {
                                css[path.basename(file)] = `${sass.compileString(fs.readFileSync(file, 'utf-8')).css}\n`;
                                console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                            } catch (err) {
                                console.error(err.toString(), '\n');
                            }
                            fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                        }
                    })
                    .on('add', file => {
                        if (/^_.+\.scss$/.test(path.basename(file))) {
                            try {
                                css[path.basename(file)] = `${sass.compileString(fs.readFileSync(file, 'utf-8')).css}\n`;
                                console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                            } catch (err) {
                                console.error(err.toString(), '\n');
                            }
                            fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                        }
                    })
                    .on('unlink', file => {
                        if (/^_.+\.scss$/.test(path.basename(file))) {
                            delete css[path.basename(file)];
                            fs.writeFileSync(name, Object.values(css).reduce((a, c) => a + c, ''));
                            console.log(`\x1b[35m${name} has been successfully compiled from all your scss partials!`, '\033[0m');
                        }
                    })
                rl.close();
            }
        }
        compile(name || process.argv[2]);
    }
}