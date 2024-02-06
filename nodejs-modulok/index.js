var http = require('http')
require('dotenv').config()
const port = process.env.PORT || 3000

http.createServer( (req,res) => {

    const fileToCheck = 'path/to/your/file.txt';

    fs.access(fileToCheck, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('A fájl nem létezik vagy nem elérhető.');
    } else {
        console.log('A fájl létezik és elérhető.');
    }
});

})
.listen( port )
