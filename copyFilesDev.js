///home/strapicarus/ganaderia-mss/backend/ganaderia/public/
const { exec } = require('child_process');
const { readdirSync, readFileSync, writeFileSync } = require('fs');

const cwd = __dirname + '/backend/';


const directories = readdirSync(cwd, {
    withFileTypes: true
}).filter(c => c.isDirectory()).map(c => c.name);

const copyFrom = '/home/strapicarus/ganaderia-mss/backend/ganaderia/public/';

checkList = async () => {
    console.log('Cheking dir list. left:', directories.length);
    const dir_ = directories.pop();
    if (!dir_) return 'Job finished...';
    await _copyFiles(dir_);
}

_copyFiles = async (app) => {
    const _dir = cwd + app
    console.log('Current dir: ', _dir);
    const child = exec('cp -r ' + copyFrom + ' ' + _dir, { cwd: _dir });
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
        checkList();
    });
}


checkList();