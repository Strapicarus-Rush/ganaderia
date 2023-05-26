// import {readFileSync, writeFileSync} from 'fs'
// let port = 8080;
// const filename = 'docker-compose.yaml'
// // Leer el archivo línea por línea
// const lines = readFileSync(filename, 'utf-8').split('\n');
// for (let i = 0; i < lines.length; i++) {
//   let line = lines[i];

//   // Si la línea contiene "SRVPORT="
//   if (line.includes('SRVPORT=')) {
//     // Reemplazar el número por el siguiente en la secuencia
//     line = line.replace(/\d+/, port++);
//     console.log(line);
//   }

//   // Escribir la línea actualizada en el archivo
//   writeFileSync(filename, lines.join('\n'));
// }

// import { readFileSync, writeFileSync} from 'fs'
// // const fs = require('fs');

// // Nombre del archivo a leer
// const filename = 'archivo.txt';

// // Leer el archivo completo
// const fileContents = readFileSync(filename, 'utf-8');

// // Secuencia de números para los puertos
// let port = 8080;

// // Expresión regular para buscar bloques de configuración
// const blockRegex = /(company:|bread:)\s*{[^}]*}/g;

// // Reemplazar el número en cada bloque de configuración
// const newFileContents = fileContents.replace(blockRegex, block => {
//   // Buscar el número actual en el bloque y reemplazarlo por el siguiente en la secuencia
//   const regex = /\bSRVPORT\s*=\s*(\d+)\b/;
//   const newBlock = block.replace(regex, (match, p1) => {
//     return `SRVPORT=${port++}`;
//   });
//   return newBlock;
// });

// // Escribir el archivo actualizado
// writeFileSync(filename, newFileContents);


// const { readFileSync, writeFileSync } = require('fs');
// // const fs = require('fs');

// // leer el archivo que contiene los identificadores y puertos
// const portsFile = './ports';
// const portsData = readFileSync(portsFile, 'utf8');
// const ports = {};
// portsData.split('\n').forEach(line => {
//     console.log(`Procesando línea: ${line}`);
//     const [id, port] = line.trim().split(/\s+/);
//     ports[id] = port;
// });

// // leer el archivo de configuración
// const configFile = './docker-compose.yaml';
// let configData = readFileSync(configFile, 'utf8');

// // buscar e iterar los bloques de configuración
// const blockRegex = /^(\w+):\s*([\s\S]*?)^- \w+=\d+/gm;
// let match;
// while ((match = blockRegex.exec(configData)) !== null) {
//     console.log('Searching');
//     const blockName = match[1];
//     const blockContent = match[2];
//     const blockPort = ports[blockName];
//     console.log(blockName,blockContent,blockPort);

//     if (blockPort) {
//         console.log('Ingreso Block...')
//         // reemplazar el puerto en el bloque de configuración
//         const newBlockContent = blockContent.replace(/(\n\s+-\s+SRVPORT=)\d+/, `$1${blockPort}`);
//         configData = configData.replace(blockContent, newBlockContent);
//     }
// }

// console.log(`Archivo modificado: ${configData}`);
// // escribir el archivo de configuración actualizado
// writeFileSync(configFile, configData);


const { readFileSync, writeFileSync } = require('fs');

function cambiarPuertosEnArchivo(archivo, archivoPuertos) {
    const bloques = {};
    let bloqueActual = '';
    let contenidoNuevo = '';

    // Leer archivo de puertos y almacenar en un objeto
    const puertos = readFileSync(archivoPuertos, 'utf8')
        .trim().split('\n')
        .map(linea => linea.split(' '))
        .reduce((acc, [servicio, puerto]) => ({ ...acc, [servicio]: puerto }), {});

    // Leer archivo de configuración y cambiar puertos
    const lineas = readFileSync(archivo, 'utf8').trim().split('\n');

    lineas.forEach(linea => {
        // Si es una línea que empieza con un bloque, guardar nombre del bloque
        if (/^\s*[a-zA-Z]+:\s*$/.test(linea)) {
            bloqueActual = linea.trim().slice(0, -1); // eliminar ':' del nombre del bloque
            bloques[bloqueActual] = []; // inicializar arreglo para las líneas del bloque
            bloques[bloqueActual].push(linea);
        }
        // Si es una línea dentro de un bloque, guardar en arreglo
        else if (bloqueActual !== '') {
            bloques[bloqueActual].push(linea);
        }
        // Si es una línea fuera de un bloque, guardar en nuevo contenido
        else {
            contenidoNuevo += `${linea}\n`;
        }
    });

    // Recorrer bloques, cambiar puerto y añadir al nuevo contenido
    Object.entries(bloques).forEach(([servicio, lineas]) => {
        let bloqueCambiado = false;
        const nuevasLineas = lineas.map(linea => {
            // Si la línea contiene SRVPORT=, cambiar el puerto
            if (linea.includes('SRVPORT=')) {
                const nuevoPuerto = puertos[servicio];
                bloqueCambiado = true;
                return linea.replace(/\d+/, nuevoPuerto);
            }
            // Si no contiene SRVPORT=, mantener la línea
            else {
                return linea;
            }
        });
        // Si se cambió el puerto, añadir las nuevas líneas al nuevo contenido
        if (bloqueCambiado) {
            contenidoNuevo += `${nuevasLineas.join('\n')}\n`;
        }
        // Si no se cambió el puerto, añadir las líneas originales al nuevo contenido
        else {
            contenidoNuevo += `${lineas.join('\n')}\n`;
        }
    });

    // Escribir nuevo contenido al archivo
    writeFileSync(archivo, contenidoNuevo);
}

cambiarPuertosEnArchivo('./docker-compose.yaml', './ports')