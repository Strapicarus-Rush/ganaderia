/**
 * DEPRECATED
 * Loop over current dir to create images and containers
 * install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin for production docker-compose use.
 * 
 */

/**
 * 
sed -i 's/\(ENV SRVPORT=\)\d+/\19090/' archivo.txt
sed -i 's/\(EXPOSE \)\d+/\19090/' archivo.txt
 */
let port_1 = 8080;
let port_2 = 8080;
const { exec } = require('child_process');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const cwd = __dirname + '/backend/';
const images = [];

function showmsg(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

replacePort = async (file) => {
    try {
        const data = readFileSync(file, 'utf8')
        const result = data.replace(/EXPOSE 8080/g, 'EXPOSE ' + port_1);
        const result1 = result.replace(/ENV SRVPORT=8080/g, 'ENV SRVPORT=' + port_1);
        // const result = data.replace(/(EXPOSE|ENV\s+SRVPORT)=(\d+)/g, port_1);
        writeFileSync(file, result1, 'utf8');
        port_1++
    } catch (error) {
        console.log('ERROR:', error)
    }
}

showmsg('mapping directories...', 'green');

const directories = readdirSync(cwd, {
    withFileTypes: true
}).filter(c => c.isDirectory()).map(c => c.name);

for (let index = 0; index < directories.length; index++) {
    const file = cwd + directories[index] + '/dockerfile';
    replacePort(file);
}

const checkListDir = async (data) => {
    if (data) console.log(data);
    console.log('Cheking directory list. left:', directories.length);
    const img = directories.pop();
    if (!img) {
        showmsg('ALL IMAGE CREATION FINISHED...', 'green');
        return checkListImg();
    }
    showmsg('preparing to replace port to ' + port_1, 'red');
    showmsg('looking for file ' + cwd + img + '/dockerfile', 'red');
    await replacePort(cwd + img + '/dockerfile');
    port_1++;
    console.log('selected img: ', img);
    await createImage(img);
    images.push(img);
}

const createImage = async (img) => {
    const child = await exec('docker image build -t aim_' + img + ' .', { cwd: cwd + img });
    let stdout_;
    let stderr_;
    child.stdout.on('data', function (data) {
        stdout_ = data;
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        stderr_ = data;
    });
    child.on('close', function (code) {
        showmsg('closing code: ' + code, 'orange');
        return checkListDir(stdout_);
    });
}

// checkListDir();

const checkListImg = async (data) => {
    if (data) console.log(data);
    console.log('Cheking Images list. left:', images.length);
    const img = images.pop();
    if (!img) return console.log('ALL CONTAINER CREATION FINISHED.');
    console.log('selected img: ', img);
    const result = await createContainer(img);
    // console.log('result:',result);
}

const createContainer = async (img) => {
    console.log('docker create -p ' + `${port_2}` + ':' + `${port_2}` + ' -i --name cont_' + img + ' aim_' + img)
    const child = await exec('docker create -p ' + `${port_2}` + ':' + `${port_2}` + ' -i --name cont_' + img + ' aim_' + img, { cwd: cwd + img });
    let stdout_;
    let stderr_;
    child.stdout.on('data', function (data) {
        stdout_ = data;
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        stderr_ = data;
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
        port_2++
        return checkListImg(stdout_);
    });
}



