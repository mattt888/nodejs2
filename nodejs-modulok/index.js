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
            const rows = data.toString().split("\n")
            log ('az egész fájl tartalma: rows változó: ' , rows)
            let lista = ''

            rows.forEach( comment => {
                if (comment.length > 0) {
                    const [name, email, content] = comment.split(";")
                    lista += `<div>
                                <h4>${name}</h4>
                                <p>${email}</p>
                                <q>${content}</q>
                                <hr>
                              </div>`
                }
            })

            fs.readFile(__dirname + '/index.html', (err, data) => {

                utilities.logVisit('/access.log', req, res, data, lista)
            })
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
            // function append_db_Dot_CSV (filename) {
            //     const {name, email, content} = querystring.parse(sent)
            //     fs.appendFile(filename, `${name};${email};${content}\n`, (err) => {

            //         if (!err) {
            //             utilities.logEntry('/access.log', req, res)
            //             res.writeHead(302, {Location: '/'})
            //             res.end()
            //         }
            //         else {
            //             log('Hiba történt a fájlhozzáfűzés során, fájl: db.csv')
            //         }
            //     })
            // }
        });
    }
})
server.listen(port)