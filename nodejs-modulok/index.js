var http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 8000
const fs = require('node:fs')
const querystring = require('querystring')
const express = require('express')
const app = express();

const server = http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write(`<p>${port}</p>`)
    res.write(`<p>Request method: ${req.method}</p>`)
    res.write(`<p>innentől jön a dinamikus tartalom:</p>`)

    if (req.method === 'GET') {
        fs.createReadStream(__dirname + '/index.html').pipe(res)
    }

    else if (req.method === 'POST') {
        let data = ''

        req.on('data', chunk => {
        data += chunk
        console.log('Data: ' , data);
        })

        req.on('end', () => {
            // Az URL-kódolt adatok megfelelő feldolgozása
            const decodedData = decodeURIComponent(data);
            const parsedData = querystring.parse(decodedData);

            // A parsedData most tartalmazza a POST adatokat objektum formában
            console.log('Decoded Data:', decodedData);
            console.log('Parsed Data:', parsedData);

            const datetime = new Date();
            const now = datetime.toISOString().replace('Z', '').replace('T', ' ').slice(0,-2);
            // var isoDateString = new Date().toISOString();

            const dataToAppend = "\nA komment objektumként tárolva: " + JSON.stringify(parsedData) +
                                 '\nEkkor készült/timestamp: '+ now
            // Az adat, amit hozzá szeretnénk adni

            const filePath = 'C:/Users/Mate/Downloads/Rebuild 09 04/nodejs2/nodejs-modulok/test222.txt';

            const appendStream = fs.createWriteStream(filePath, { flags: 'a' });

            appendStream.write(dataToAppend);
            appendStream.end();

            ///////////////////////// működik 2, createWriteStream-mel:
            // const writableStream = fs.createWriteStream(filePath, { encoding: 'utf8' });
            // // Adatok írása az adatfolyamba
            // writableStream.write(dataToAppend)
            // // Írás befejezése
            // writableStream.end();
            // // Hiba kezelése
            // writableStream.on('error', (err) => {
            // console.error('Hiba történt az írás során:', err);
            // });
            // const timestamp = () => {
            //     console.log('Az adatokat/kommenteket sikeresen hozzáadtuk a fájlhoz, Jelenlegi dátum: ', now);
            //     console.log('Vége a kódnak -----------------------');
            // }
            // // Írás befejezése utáni esemény
            // writableStream.on('finish', () => {
            //     timestamp();
            // });
            /////////////////////////////


            ///////////////////////////////////////// működik 1, appendFile-lal:
            // fs.appendFile(__dirname+'/test.txt', dataToAppend, err => {
            //     if (err) {
            //         console.error('Hiba történt a fájlhoz adás során.', err);
            //       } else {
            //             console.log('Az adatokat/kommenteket sikeresen hozzáadtuk a fájlhoz, Jelenlegi dátum: ', now);
            //             console.log('Vége a kódnak -----------------------');
            //       }
            // })
            ////////////////////////////////////////////
          
            // Most már a szerver válaszolhat a feldolgozott adatokkal
            res.write(`<p>Név: ${parsedData.name} </p>`)
            res.write(`<p>Email cím: ${parsedData.email} </p>`)
            res.write(`<p>Komment: ${parsedData.content} </p>`)
            res.end();
          });
    }

})

server.listen(port)
