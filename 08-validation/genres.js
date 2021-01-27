const mongoose = require("mongoose");
const express = require("express");
const Joi = require('joi');
const router = express.Router(); // to export need to use ROUTER

const genreSchema = mongoose.Schema({
  //id: AUTOMATIC created by mongo _id: object
  name: {
      type: String,
      required: true,
      minlength: 3
  }
});
const GenreModel = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}


//read
router.get('/', async (req, res) => {
  const genres = await GenreModel.find().sort({ name: 1 });
  res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let newGenre = new GenreModel({ name: req.body.name });
    newGenre = await newGenre.save();
    res.send(newGenre);
});

//update
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
    
  let updatedGenre = await GenreModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!updatedGenre) return res.status(404).send('The genre with the given ID was not found.');

  updatedGenre = updatedGenre.save();
  res.send(updatedGenre);
});


router.delete('/:id', async (req, res) => {
  let removedGenre = await GenreModel.findByIdAndDelete(req.params.id);
  if (!removedGenre) return res.status(404).send('The genre with the given ID was not found.');
  removedgenre = removedGenre.save();
  res.send(removedgenre);
});

router.get('/:id', async (req, res) => {
  let theGenre = await GenreModel.findById(req.params.id);
  if (!theGenre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(theGenre);
});

  

module.exports = router;
