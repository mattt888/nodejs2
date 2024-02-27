var http = require('node:http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('node:fs')
const querystring = require('querystring')
const { log } = require('node:console')
const utilities = require('./utilities')

const server = http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})
    
    if (req.method === 'GET') {

        fs.readFile('db.csv', (err, data) => {
            if(!err) {
                const lista = utilities.createList(data)
                fs.readFile(__dirname + '/index.html', (err, data) => {
                    if(!err) {
                        utilities.logVisit('/access.log', req, res, data, lista)
                    }
                    else {
                        log(`Hiba a fájlból való kiolvasás során, fájl: index.html, hiba: ${err}`)
                    }
                })
            }
            else {
                log(`Hiba a fájlból való kiolvasás során, fájl: db.csv, hiba: ${err}`)
            }
        })
    }

    else if ( req.method === 'POST' ) {

        let sent = ''

        req.on('data', chunk => {
          sent += chunk
          console.log('Sent Data: ' , sent);
        })

        req.on('end', () => {
            utilities.append_db_Dot_CSV('db.csv', res, req, sent)
        });
    }
})
server.listen(port)