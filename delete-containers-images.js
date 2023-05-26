/**
 * 
 * get the list of containers and get ip's.
 * 
 */
const cregex = /,/ig
const { exec } = require('child_process');


async function getListContainers() {
    let list = '';
    const child = exec('docker ps -a -q');
    child.stdout.on('data', function (data) {
        const cleanedString = data.slice(0, -1);
        list = cleanedString.split('\n').map(line => line.trim()).toString().replace(cregex,' ');
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        // console.log('Container list: ', list);
        if (list===''){
            console.log('There is no containers... Looking for images...');
            getListImages();
        }else{
            removeContainer(list);
        }
    });
}

async function getListImages() {
    let list = '';
    const child = exec('docker images -q');
    child.stdout.on('data', function (data) {
        const cleanedString = data.slice(0, -1);
        list = cleanedString.split('\n').map(line => line.trim()).toString().replace(cregex, ' ');
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        if(list === '') return console.log('There is no images... Nothing to do...');
        removeImage(list);
    });
}
async function removeContainer(list) {
    if(list==='')getListImages();
    console.log('Container list: ', list);
    const child = exec('docker container rm ' + list);
    child.stdout.on('data', function (data) {
        console.log('DATA;\n',data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        if (list===''){
            console.log('There is no images... Nothing to do...');
        }else{
            getListImages();
        }
    });
}

async function removeImage(list) {
    console.log('Images list: ', list);
    const child = exec('docker image rm ' + list);
    child.stdout.on('data', function (data) {
        console.log('DATA;\n',data);
    });
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function (code) {
        console.log('Done....')
    });
}

getListContainers();