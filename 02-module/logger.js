var url = 'http://mylogger.io/log';

function myLog(msg) {
    console.log(msg);
    
}

//module.exports.myLog = log;
//console.log(module);
module.exports.endPoint = url;
module.exports.myLog = myLog;

//module.exports = myLog;

