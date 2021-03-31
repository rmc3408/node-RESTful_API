const Joi = require("joi");
const mongoose = require("mongoose");

const custSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: Number,
    default: 1111,
    min: 1000,
    maxlength: 100000,
  },
});
const CustModel = mongoose.model("Customer", custSchema);

function validateGenre(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().required(),
  };
  return Joi.validate(customer, schema);
}

module.exports.CustModel = CustModel;
module.exports.validateGenre = validateGenre;