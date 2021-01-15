const express = require("express");
const logger = require("./logger");
const authentifyer = require('./authentication');
const morgan = require('morgan');

const app = express();
app.use(express.json()); //Built-in Middleware , convert body to JSON
app.use(express.urlencoded({extended: true})); //Built-in Middleware , convert data from URL (key=value%&key=value) into req.body
app.use(express.static('public'));
app.use(morgan('tiny'));

app.use(logger);    // custom made middleware - receive req, res and Send to Next() method (passing into APP)
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

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" }
];


app.get("/api", (req, res) => {
  res.send(genres);
});

app.post("/api", (req, res) => {
  console.log(req.body);

  //save validate property in new genre
  const newGenre = {
      id: genres.length + 1,
      name: req.body.name
  };
  genres.push(newGenre);
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));
