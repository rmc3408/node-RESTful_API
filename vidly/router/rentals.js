const { Rental, validate } = require("../models/rental");
const { MovieModel } = require("../models/movie");
const { CustModel } = require("../models/customer");

const mongoose = require("mongoose");
const Fawn = require("fawn");
Fawn.init(mongoose);

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await CustModel.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await MovieModel.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  
  //need transaction
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();

  try {
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 }})
    .run();
    res.send(rental);
    
  } catch (ex) {
    res.status(500).send('2 points commit Failed!!!');
  }
  


});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
