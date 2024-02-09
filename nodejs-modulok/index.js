var http = require('http')
require('dotenv').config()
const port = process.env.PORT || 3000
const fs = require('fs');

http.createServer( (req, res) => {

    res.writeHead( 200, {'Content-Type': 'text/html; charset=utf-8'})

    // Fájlhoz adás
    var isoDateString = new Date().toISOString();
    const dataToAppend = "\nEz szinkron bejegyzés, ekkor készült: " 
        + isoDateString + ' |||| ' + Date.now().toString().slice(-4) +'\n' 
        + console.log('Fájlhoz való hozzáfűzés dátuma:', Date.now().toString().slice(-4)); 
        // Az adat, amit hozzá szeretnénk adni

    fs.appendFileSync(__dirname+'/test.txt', dataToAppend)
        res.write(`<h2>OK, jelenlegi dátum: ${isoDateString}</h2>`);
        res.write(`<h2>OK, jelenlegi dátum: ${Date.now().toString().slice(-4)}</h2>`);
        console.log('console.log,   Jelenlegi dátum: ' + Date.now().toString().slice(-4));
        console.log('Vége a kódnak ***********');
        res.end()
})
.listen(port)
