#!/usr/bin/env node
{
    const fs = require('fs');
    const path = require('path');

    function readFolder(folder, n = 0) {
        if (n === 0) fs.writeFileSync("styles.scss", '')
        fs.readdir(folder, (err, files) => {
            if (err) {
                return false;
            }
            files.forEach(file => {
                if (/^\w+$/.test(file)) {
                    readFolder((folder === process.cwd()) ? `${file}` : `${folder}/${file}`, 1);
                }
                if (/^_.+\.scss$/.test(file)) {
                    fs.writeFileSync("styles.scss", `@import '${(folder === process.cwd()) ? `./${file}` : `./${folder}/${file}`}';\n`, { flag: 'a' });
                }
            });
        });
        return true;
    }

    if (path.basename(process.cwd()) === 'src') {
        if (readFolder(process.cwd())) {
            console.log("\x1b[35m", 'styles.scss written successfully with links to partials!!!');
        }
    } else {
        console.error("\x1b[31m", 'ERROR: Must use command inside src folder!!!');
    }
    console.log("\x1b[0m")
}