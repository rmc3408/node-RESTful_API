const express = require("express");
const router = express.Router(); // to export need to use ROUTER
const { MovieModel, validateMovie } = require('../models/movie');
const { GenreModel } = require('../models/genres');


//read
router.get('/', async (req, res) => {
  const movies = await MovieModel.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await GenreModel.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre');
    
  let newFilm = new MovieModel({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

    newFilm = await newFilm.save();
    res.send(newFilm);
});


module.exports = router;
