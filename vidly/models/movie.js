const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

const MovieModel = mongoose.model("Movies", movieSchema);

function validateMovie(film) {
  const schema = {
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  };
  return Joi.validate(film, schema);
}

module.exports.MovieModel = MovieModel;
module.exports.validateMovie = validateMovie;
