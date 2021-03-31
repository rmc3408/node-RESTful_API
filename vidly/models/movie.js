const mongoose = require("mongoose");
const Joi = require("joi");


const movieSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number
    }
  });
  const MovieModel = mongoose.model("Movie", movieSchema);
  
  function validateMovie(film) {
    const schema = {
        name: Joi.string().min(3).required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };
    return Joi.validate(film, schema);
  }
  
  module.exports.MovieModel = MovieModel;
  module.exports.validateMovie = validateMovie;
  