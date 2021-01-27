const mongoose = require("mongoose");
const express = require("express");
const Joi = require('joi');
const router = express.Router(); // to export need to use ROUTER

const custSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
      type: String,
      required: true,
      minlength: 3
  },
  phone: {
    type: Number,
    default: 1111,
    min: 1000,
    maxlength: 100000
  }
});
const CustModel = mongoose.model('Customer', custSchema);

function validateGenre(customer) {
  const schema = {
      isGold: Joi.boolean(),
      name: Joi.string().min(3).required(),
      phone: Joi.number().required()
    };
    return Joi.validate(customer, schema);
}


//read
router.get('/', async (req, res) => {
  const custs = await CustModel.find().sort({ name: 1 });
  res.send(custs);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new CustModel({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    customer = await customer.save();
    res.send(customer);
});

//update
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
    
  let updatedCust = await CustModel.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, { new: true });
  if (!updatedCust) return res.status(404).send('The Customer with the given ID was not found.');

  //updatedCust = updatedCust.save(); WHEN save , do not return.
  res.send(updatedCust);
});


router.delete('/:id', async (req, res) => {
  let removedCust = await CustModel.findByIdAndDelete(req.params.id);
  if (!removedCust) return res.status(404).send('The Customer with the given ID was not found.');
  removedCust = removedCust.save();
  res.send(removedCust);
});

router.get('/:id', async (req, res) => {
  let thecustomer = await CustModel.findById(req.params.id);
  if (!thecustomer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(thecustomer);
});

  

module.exports = router;
