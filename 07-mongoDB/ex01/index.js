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

async function getAllCourseBackend() {
    const result = await Exercise
        .find({ tags: "backend", isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
        ;
    return result;
}
//getAllCourseBackend().then(r => console.log(r));


async function getCourseFrontBack() {
    return await Exercise
        .find({ isPublished: true })
        .or([{ tags: "backend" }, { tags: "frontend" } ])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
}

async function getCoursesBY() {
    return await Exercise
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
}


async function run() {
    const bf = await getCourseFrontBack();
    const by = await getCoursesBY();
    console.log(by);
}

run();


app.get('/', (req, res) => { 
    return res.send(newPage);
 });

const port = process.env.NODE_ENV || 3000;
app.listen(port, () => console.log('connected at 3000'));