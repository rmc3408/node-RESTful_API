const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  //id: AUTOMATIC created by mongo _id: object
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});
const GenreModel = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports.GenreModel = GenreModel;
module.exports.validateGenre = validateGenre;
