function authentifyer(req, res, next) {   //Middleware transfer to another.
    console.log('Authentication...');
    next();
}
  
module.exports = authentifyer;
