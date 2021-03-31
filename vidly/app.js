const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./router/genres");
const customers = require('./router/customers');
const movies = require('./router/movies');
const rentals = require('./router/rentals');


app.use(express.json());
app.use("/genres", genres);
app.use('/customers', customers);
app.use('/movies', movies);
app.use('/rentals', rentals);


mongoose.connect("mongodb://localhost/Mosh-nodeCourse", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(()=> console.log("Mosh-nodeCourse database is online..."));

app.get("/", (req, res) => {
  res.render("homePage");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));