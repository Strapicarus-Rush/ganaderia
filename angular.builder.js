/**
 * build all angular app's in ./frontend_angular-elements directory
 * except for gandaería wich is the main app envelope.
 */

const { exec } = require('child_process');
const { readdirSync, readFileSync, writeFileSync } = require('fs')
const concat = require('concat');


const cwd = __dirname + '/frontend_angular-elements/'


console.log('mapping directories...', cwd);
const directories = readdirSync(cwd, {
    withFileTypes: true
}).filter(c => c.isDirectory()).map(c => c.name);

checkList = async () => {
    console.log('Cheking dir list. left:', directories.length);
    const dir_ = directories.pop();
    if (!dir_) return 'Job finished...'
    await _build(dir_);
}

_build = async (app) => {
    console.log('Current dir: ', cwd + app)
    const child = exec('npm run bundle', { cwd: (cwd + app) });
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
        _buildFinished(app,true);
    });
}
console.log('prepare...')


async function _buildFinished (app, concact, moveFiles){
    if(concact) return await concatScripts(app);
    if(moveFiles) return await moveArchive(app);
    checkList();
}

/**
 * Concat angular build bundle files.
 */


async function concatScripts(app) {

    const concatFile = 'mss-' + app + '.js';
    const output = cwd + app + '/dist/' + app + '/' + concatFile;

    // const boutput = bout + app + '/public/' + concatFile;

    // const cdnOutput = cdn + concatFile
    const files = [
        cwd + app + '/dist/' + app + '/runtime.js',
        cwd + app + '/dist/' + app + '/polyfills.js',
        cwd + app + '/dist/' + app + '/main.js'
    ];
    await concat(files, output); // concat files and save to dist/[App] directory.
    // await concat(files, cdnOutput); // concat files and save to the cdn/content directory
    // await concat(files, boutput); // concat files and save to [App]/public
    await replaceTag(app, concatFile); // replace scripts main, runtime tag to use the concact js file.
    _buildFinished(app,false,true);
};

async function moveArchive(app) {
    const bout = __dirname + '/backend/';
    const cdn = __dirname + '/cdn/content/';
    // if (app === 'ganaderia') {
    try {
        console.log('Trying to copy index, css and manifest from dist to public on de server.');
        console.log('cp ' + cwd + app + '/dist/' + app + '/index.html  ' + bout + app + '/public/index.html');
        const child = exec('cp ' + cwd + app + '/dist/' + app + '/index.html  ' + bout + app + '/public/index.html', { cwd: (cwd + app) });
        const child2 = exec('cp ' + cwd + app + '/dist/' + app + '/manifest.webmanifest  ' + bout + app + '/public/manifest.webmanifest', { cwd: (cwd + app) });
        const child3 = exec('cp ' + cwd + app + '/dist/' + app + '/ngsw.json  ' + bout + app + '/public/ngsw.json', { cwd: (cwd + app) });
        const child4 = exec('cp ' + cwd + app + '/dist/' + app + '/safety-worker.js  ' + bout + app + '/public/safety-worker.js', { cwd: (cwd + app) });
        const child5 = exec('cp ' + cwd + app + '/dist/' + app + '/styles.css  ' + bout + app + '/public/styles.css', { cwd: (cwd + app) });
        const child6 = exec('cp ' + cwd + app + '/dist/' + app + '/ngsw-worker.js  ' + bout + app + '/public/ngsw-worker.js', { cwd: (cwd + app) });
        const child7 = exec('cp ' + cwd + app + '/dist/' + app + '/mss-' + app + '.js  ' + bout + app + '/public/mss-' + app + '.js', { cwd: (cwd + app) });

        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });
        child2.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child2.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child2.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });

        child3.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child3.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child3.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });
        child4.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child4.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child4.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });
        child5.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child5.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child5.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });
        child6.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child6.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child6.on('close', function (code) {
            console.log('main index.html copied...');
            console.log('closing code: ' + code);
        });
        child7.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        child7.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        child7.on('close', function (code) {
            console.log('main index.html copied...');
            _buildFinished(app,false);
        });
    } catch (error) {
        console.error(error);
    }
    // }    
}



async function replaceTag(app, concatFile) {
    const fileEdit = cwd + app + '/dist/' + app + '/index.html'
    console.log('replacing tag from index', fileEdit)
    try {
        const data = readFileSync(fileEdit, 'utf8');
        if (app == 'ganaderia') {
            // const tagChanged = data.replace(/app-root/g, app + '-app'); // replace tag app-root with the custom element tag created.
            const scriptReplaced = data.replace(/<script src="runtime.js" type="module"><\/script>/, '<script src="' + concatFile + '" type="module"></script>'); // replace runtime with the concat file
            const delScriptpoly = scriptReplaced.replace(/<script src="polyfills.js" type="module"><\/script>/, '');
            const result = delScriptpoly.replace(/<script src="main.js" type="module"><\/script>/, '');
            writeFileSync(fileEdit, result, 'utf8')
            console.log('Finnish replacing..');

        } {
            // const tagChanged = data.replace(/app-root/g, app + '-app'); // replave tag app-root with the custom element tag created.
            const scriptReplaced = data.replace(/<script src="runtime.js" type="module"><\/script>/, '<script src="' + concatFile + '" type="module"></script>'); // replace runtime with the concat file
            const delScriptpoly = scriptReplaced.replace(/<script src="polyfills.js" type="module"><\/script>/, '');
            const result = delScriptpoly.replace(/<script src="main.js" type="module"><\/script>/, '');
            writeFileSync(fileEdit, result, 'utf8', function (err) {
                if (err) return console.log(err);
                return 0
            });
            console.log('Finnish replacing..');

        }
    } catch (error) {
        console.error(error)
    }
}

checkList();