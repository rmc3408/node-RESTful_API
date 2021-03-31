const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const AuthorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", AuthorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: AuthorSchema,
      required: true,
    },
  })
);

const Courses = mongoose.model(
  "Courses",
  new mongoose.Schema({
    name: String,
    authors: [AuthorSchema],
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Courses({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function createCourses(name, authors) {
  const course = new Courses({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    "author.name": "Colt Steele",
  });
  course.save();
}

async function addCourse(id, aut) {
  const course = await Courses.findById(id);
  course.authors.push(aut);
  course.save();
}

async function removeCourse(id, autID) {
    const course = await Courses.findById(id);
    const theAuthor = course.authors.id(autID);
    theAuthor.remove();
    course.save();
}

// createCourses("Node Course", [
//   new Author({ name: "Colt" }),
//   new Author({ name: "Max" }),
//   new Author({ name: "Mosh" }),
// ]);

//createCourse('Node Course', new Author({ name: 'Mosh' }));

//updateCourse('6064c49a2e9e8f2040940b85');
//addCourse('6064cc153abb56274408abd2', new Author({ name: "Andrew" }));

//removeCourse('6064cc153abb56274408abd2','6064cc153abb56274408abd1');
//listCourses();
