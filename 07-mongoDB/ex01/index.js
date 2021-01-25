const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/Mosh-nodeCourse', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo Server'));

const myMoshSchema = mongoose.Schema({
    tags: Array,
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number

}); 

const Exercise = mongoose.model('courses', myMoshSchema);

async function getAllCourse() {
    const result = await Exercise
        .find({ tags: "backend", isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
        ;
    return result;
}
let newPage;
getAllCourse().then(r => console.log(r));


app.get('/', (req, res) => { 
    return res.send(newPage);
 });

const port = process.env.NODE_ENV || 3000;
app.listen(port, () => console.log('connected at 3000'));