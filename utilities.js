const fs = require('node:fs')
const { log } = require('node:console')
const querystring = require('querystring')
// ciklikus import elkerülése érdekében a következő sort kommenteljem ki:
// const utilities = require('./utilities')

module.exports = {

    logVisit: function (filename, req, res, data, lista) {
        try {
            fs.appendFileSync(__dirname + filename, `[${new Date().toLocaleString('hu-HU')}]
Az ${req.connection.remoteAddress} IP címről új LÁTOGATÁS történt\n`)
        }
        catch (e) {
            log(e)
        }
        res.end(data.toString().replace('{list}', lista))
    },

    logEntry: function (filename, req, sent222 ) {
        try {
            log('logEntrysent222 logEntrysent222 logEntrysent222:,' , sent222)
            log('toString toString: ' , sent222.toString())
            fs.appendFileSync(__dirname + filename, `[${new Date().toLocaleString('hu-HU')}]
        Az ${req.connection.remoteAddress} IP címről új BEJEGYZÉS történt, tartalma: ${JSON.stringify(sent222)} \n`)

        }
        catch (e) {
            log('Hiba a logEntry: function során')
        }
    },

    append_db_Dot_CSV: function (filename, res, req, sent) {

            const {name, email, content} = querystring.parse(sent)
            const sent222 = {name, email, content}
            log('sent222 sent222 sent222: ', sent222)
            // Erre nem tudtam rájönni magamtól hogy ide kell áthelyezni ezt a fv-t: 
            // plusz még hogy így kell hivatkoni rá: this.logEntry
            // eredeti ötletem: utilities.logEntry
            this.logEntry('/access.log', req, sent222); // itt a módosítás

            fs.appendFile(filename, `${name};${email};${content}\n`, (err) => {
            
                if (!err) {
                    res.writeHead(302, {Location: '/'})
                    res.end()
                }
                else {
                    log('Hiba történt a fájlhozzáfűzés során, fájl: db.csv')
                }
            })
    }
}