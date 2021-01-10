//console.log(global);
//console.log(module);



//WHEN export only object
//const mylog = require('./logger');
//myLog('printing by function');
const logger = require('./logger');
logger.myLog('print by object created');



//Module PATH
//log(module);
const path = require('path');
const pathFile = path.parse(__filename);
console.log(pathFile);



//MODULE OS
const os = require('os');
const total = os.totalmem();
console.log('Total of ' + total + ' bytes of memory');
console.log('Free ' + os.freemem() + ' bytes of memory');


//MODULE File System
const fs = require('fs');
const whereSyn = fs.readdirSync('./');
console.log(whereSyn);

const whereAsync = fs.readdir('./', (err, files) => { // asyncronous execute after all syncronous.
console.log('Error is ', err);
console.log('Result is ', files);
});



//Module EVENT - import a class called Emitter
const EventEmmiter = require('events'); // assign to clas
const myEmission = new EventEmmiter(); // create object type EventClassEmmiter
//register a listener
myEmission.on('shine the light', function (myEvent) {
    console.log('Message caught by listener and ', myEvent);
} );
myEmission.emit('shine the light', { id: 1, LogFile:logger.endPoint, url:'http://'});




// Module HTTP
const site = require('http');
const mySite = site.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello People');
        res.end();
    }
    if (req.url === '/api') {
        res.write(JSON.stringify(logger.endPoint));
        res.end();
    }
});
mySite.listen(3000); 
console.log('listening on port 3000');
