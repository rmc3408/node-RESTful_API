var x =;
var url = 'http://mylogger.io/log';

function log(msg) {
    console.log(msg);
}

//module.exports.myLog = log;
//console.log(module);
module.exports.endPoint = url;
module.exports = log;

