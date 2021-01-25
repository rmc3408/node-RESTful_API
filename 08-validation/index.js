const express = require("express");
const mongoose = require('mongoose');
const app = express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connect to MongoDB server...'))
    .catch(err => console.error('Unable to Connect to MongoDB server...', err));

//Create Schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    price: Number,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//Model (template of collections = Class)
const CourseClass = mongoose.model('courses', courseSchema); //Create a Class following this template 



async function getCourses() {
   

    const allCourse = await CourseClass;
        
    console.log(allCourse);
    
}
getCourses();


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

//CReate
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


//update direct in Database
async function updateCourse(id) {
    const result = await CourseClass.updateOne(
        { _id: id }, { $set: {
                isPublished: false,
                author: 'Colt Steele'
            }});
    
    console.log(result);
}
//updateCourse('600e1d7eebc98a2344f171d1');

async function removeCourse(id) {
    const result = await CourseClass.deleteOne({ _id: id });
    console.log(result);
}
//removeCourse('600e1d7eebc98a2344f171d1');


app.get('/', (req,res) => {
  res.render('homePage');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));
