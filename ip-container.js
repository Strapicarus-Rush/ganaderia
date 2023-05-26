/**
 * 
 * get the list of containers and get ip's.
 * 
 */

const { exec } = require('child_process');

const ipAddressRegex = /(?<="IPAddress": ")[^"]+/;
const projectRegex = /"com.docker.compose.project": "(.*?)"/;
const serviceRegex = /"com.docker.compose.service": "(.*?)"/;
const portRegex = /"(\d+)\/(tcp|udp)":/g;



async function getListActive() {
    let list = [];
    const child = exec('docker ps -q');
    child.stdout.on('data', function (data) {
        // console.log('DATA;\n',data)
        const cleanedString = data.slice(0, -1);
        // console.log(cleanedString)
        list = cleanedString.split('\n').map(line => line.trim());
        // console.log(list)
        //  list=data.split(/\n' +/);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        getIpFrom(list);
    });
}

async function getListAll() {
    const child = exec('docker ps -a -q');
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
    });
}

async function getIpFrom(list) {

    const containerID = list.pop()
    const cmmd = "docker inspect " + containerID //+ ' | grep -oP ' + re
    const child = exec(cmmd);   // | grep -oP '(?<="IPAddress": ")[^"]+'

    child.stdout.on('data', function (data) {
        // data = JSON.parse(data);
        console.log('\n')
        const ip_ = data.match(ipAddressRegex);
        const proj = data.match(projectRegex);
        const serv = data.match(serviceRegex);
        const port_ = data.match(portRegex);
        if(ip_ && ip_.length)console.log('IP: ',ip_[0])
        if(port_ && port_.length)console.log('PORT: ',port_[0])
        if(proj && proj.length)console.log('PROJ: ',proj[0])
        if(serv && serv.length)console.log('SERV: ',serv[0])
        // console.log(ip_.length?ip_[0]:'Empty', proj[0]||'Empty', serv[0]||'Empty');
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        if (list.length) {
            callWait(list);
        } else {
            console.log('Done...');
        }
    });
}

async function callWait(list){
        getIpFrom(list)
}

getListActive();