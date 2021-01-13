const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

//GET


//POST


//PUT


//DELETE




//listen
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log('Connected at 3000')})