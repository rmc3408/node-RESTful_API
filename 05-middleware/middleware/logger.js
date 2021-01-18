function log (req, res, next) {   //Middleware transfer to another, always have all 3 parameters.
    console.log('logging...');
    next(); //pass control to next middleware function.
}
  
module.exports = log;
