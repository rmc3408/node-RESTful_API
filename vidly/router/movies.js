const express = require("express");
const router = express.Router(); // to export need to use ROUTER
const { MovieModel, validateMovie } = require('../models/movie');


//read
router.get('/', async (req, res) => {
  const movies = await MovieModel.find().sort({ name: 1 });
  res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let newFilm = new MovieModel({ name: req.body.name });
    newFilm = await newFilm.save();
    res.send(newFilm);
});

//update
// router.put('/:id', async (req, res) => {
//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
    
//   let updatedGenre = await GenreModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
//   if (!updatedGenre) return res.status(404).send('The genre with the given ID was not found.');

//   updatedGenre = updatedGenre.save();
//   res.send(updatedGenre);
// });


router.delete('/:id', async (req, res) => {
  let removedFilm = await MovieModel.findByIdAndDelete(req.params.id);
  if (!removedFilm) return res.status(404).send('The genre with the given ID was not found.');
  removedFilm = removedFilm.save();
  res.send(removedFilm);
});

router.get('/:id', async (req, res) => {
  let theMovie = await MovieModel.findById(req.params.id);
  if (!theMovie) return res.status(404).send('The genre with the given ID was not found.');
  res.send(theMovie);
});


module.exports = router;
