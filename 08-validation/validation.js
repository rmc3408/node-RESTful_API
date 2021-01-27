const express = require("express");
const mongoose = require('mongoose');
const app = express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/Mosh-nodeCourse', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connect to MongoDB server...'))
    .catch(err => console.error('Unable to Connect to MongoDB server...', err));

//Create Schema
const courseSchema = new mongoose.Schema({
    author: String,
    isPublished: Boolean,
    //tags: [String],
    tags: Array,
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        match: /.*a.*/i
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        enum: ['web','mobile','network']
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        min: 2.99,
        max: 250,
        required: function () {
            return this.isPublished;
        },
        get: v => Math.ceil(v), //read an existing value from database
        set: v => Math.floor(v) //create new values.
    }
});

//Model (template of collections = Class)
const CourseClass = mongoose.model('courses', courseSchema); //Create a Class following this template 

//CReate
async function createCourse() {
    const course = new CourseClass({
        name: 'Web development',
        author: 'Angela Yu',
        price: 129,
        tags: ['backend', 'webdesign', 'react', 'frontend'],
        isPublished: true
    });
    try {
        const result = await course.save();
        //console.log(result); 
    } catch (err) {
        console.log(err.message);
        console.log(err.errors);
    }
    
} 
//createCourse();

async function getCourses() {
    const allCourse = await CourseClass;
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
