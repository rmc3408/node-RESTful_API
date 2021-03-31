const express = require("express");
const logger = require("./middleware/logger"); //custom made middleware
const authentifyer = require('./middleware/authentication'); //custom made middleware

const genres = require('./routes/genres');
const app = express();
//Use the router to short application and structurize the app.
app.use('/api', genres);


//DEBUGGER NPM debug
const startDebugger = require('debug')('app:st');
const databaseDebugger = require('debug')('app:db');
//start console logs.
startDebugger("App started in debugger");  //console.log  // $env:DEBUG='app:db'
//start Database logs.
databaseDebugger("database work is here");  // $env:DEBUG='app:db'




// Built-in Middleware
app.use(express.json()); //Built-in Middleware , convert body to JSON
app.use(express.urlencoded({extended: true})); //Built-in Middleware , convert data from URL (key=value%&key=value) into req.body

app.use(express.static('public')); // //Built-in Middleware , place picture and html page



//Configuration 
const config = require('config');
console.log('Application Name: ', config.get('name'));
console.log('Mail Server Name: ', config.get('mail.host'));
console.log('Password in Mail Server: ', config.get('mail.password')); //$env:app_password='0123'   



// Development Enviroments
const morgan = require('morgan');
if (app.get('env') === 'development') {   // POWERSHELL -> $env:NODE_ENV="production"
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('morgan reporter enable...');
  app.use(morgan('tiny'));
}


app.use(logger);    // custom made middleware - receive req, res and MUST send to Next() method (passing into APP)
app.use(authentifyer);


///////// Custom middleware inside index.js
// app.use(function (req, res, next) {   //Middleware transfer to another, always have all 3 parameters.
//   console.log('logging...');
//   next(); //pass control to next middleware function.
// });
// app.use(function (req, res, next) {   //Middleware transfer to another.
//   console.log('Authentication...');
//   next();
// });

app.get('/', (req,res) => {
  res.render('./public/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));
