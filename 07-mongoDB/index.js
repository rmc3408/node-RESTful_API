const express = require("express");

const mongoose = require('mongoose');

const app = express();


//Use the router to short application and structurize the app.
//const genres = require('./router/genres');
//app.use('/api', genres);

//Connect to mongoose
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connect to MongoDB server...'))
    .catch(err => console.error('Unable to Connect to MongoDB server...', err));


//Create Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//Schema (structure), Model (template of collections = Class)
const CourseClass = mongoose.model('courses', courseSchema); //Create a Class following this template 



async function createCourse() {
    const course = new CourseClass({
        name: 'Web development',
        author: 'Angela Yu',
        price: 129,
        tags: ['backend', 'webdesign', 'react', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    //console.log(result);
} 
//createCourse();


async function getCourses() {
    const pageNumber = 1;
    const pageLimit = 5;

    const allCourse = await CourseClass
        .find() //find ALL
        //.find({ name:'React' }) // find by name
        //.find({ price: { $gt: 10, $lt: 100 } })  //greater than, less than
        //.find({ price: { $in: [10,15,20]}})  // find any document matching exactly those values.
        //.find({author: /.*o.*/ }) // word is anywhere , Start /^Colt/ , End /Steele$/
        .skip((pageNumber - 1) * pageLimit)
        //.or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
        .limit(5) //max 5 documents
        .sort({ name: 1 }) //ascending order = 1
        .select({ name: 1, author: 1 }); //Only display those
        //.count() - number of documents showed!
    console.log(allCourse);
    
}
//getCourses();


//get
async function getUpdateCourse(id) {
    const course = await CourseClass.findById(id);
    if (!course) return;
    //console.log(course);    
    course.set({
        isPublished: true,
        author: 'Raphael Molinaro'
    });
    const result = await course.save();
    console.log(result);
}
//getUpdateCourse('600e1d7eebc98a2344f171d1');


//update direct in Database
async function updateCourse(id) {
    const result = await CourseClass.updateOne(
        { _id: id }, { $set: {
                isPublished: false,
                author: 'Colt Steele'
            }});
    
    console.log(result);
}
updateCourse('600e1d7eebc98a2344f171d1');

async function removeCourse(id) {
    const result = await CourseClass.deleteOne({ _id: id });
    console.log(result);
}
removeCourse('600e1d7eebc98a2344f171d1');


app.get('/', (req,res) => {
  res.render('homePage');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));
