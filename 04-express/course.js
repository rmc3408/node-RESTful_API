const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");

const courses = [
  { id: 1, name: "JavaScript", hours: 6 },
  { id: 2, name: "React", hours: 45 },
  { id: 3, name: "Node", hours: 14 },
  { id: 4, name: "Angular", hours: 39 },
];
const unique = { id: 1, cookies: [1, 2, 3, 4], name: "Raphael", age: 39 };

app.get("/api/example/:year/:id", (req, res) => {
  //res.send(req.params.id);
  //res.send(req.params.year);  PARAMS is a object
  res.send(req.params);
  //res.send(req.query);  // After '?' , is query objects.
});

/**
 *       GET is to READ
 */

app.get("/", (req, res) => {
  res.send("Hey Raphael");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  let selected = courses.find((c) => c.id === parseInt(req.params.id));
  if (!selected) {
    res.status(404).send("Id not found");
  }
  res.send(selected);
});

/**
 *        POST is to CREATE
 */
app.post("/api/courses", (req, res) => {
  // Old Validation
  // if (!req.body.name || req.body.name.length < 3) {
  //     res.status(400).send('Bad request of name of course');
  //     return;
  // }
  const schema = {
    name: Joi.string().min(3).required(),
    hours: Joi.number().integer().min(4).required(),
  };
  const resultValidated = Joi.validate(req.body, schema);
  //console.log(resultValidated);
  if (resultValidated.error) {
    res.status(400).send(resultValidated.error.details[0].message);
    return;
  }

  let newCourse = {
    id: courses.length + 1,
    name: req.body.name,
    hours: req.body.hours,
  };
  courses.push(newCourse);
  res.send(newCourse);
});

/**
 *        PUT is to UPDATE
 */
app.put("/api/courses/:id", (req, res) => {
  //look up the specific course, The same code as GET.
  let selected = courses.find((c) => c.id === parseInt(req.params.id));
  if (!selected) {
      return res.status(404).send("Id not found");
      
  }

  //Validate if new entry
  const { error } = validator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update course in courses
  selected.name = req.body.name;
  selected.hours = req.body.hours;
  res.send(selected);
});

/**
 *        DELETE
 */
app.delete("/api/courses/:id", (req, res) => {
  //look up the specific course to delete.
  let selected = courses.find((c) => c.id === parseInt(req.params.id));
  if (!selected) {
      return res.status(404).send("Id not found");
  }

  //remove from our data
  const idx = courses.indexOf(selected);
  courses.splice(idx, 1);

  //return updates in courses
  res.send(courses);
});

function validator(selected) {
  const schema = {
    name: Joi.string().min(3).required(),
    hours: Joi.number().integer().min(4).required(),
  };
  const resultValidated = Joi.validate(selected, schema);
  return resultValidated;
}

//PORT is defined by process and use ENViroment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected at ${port}`));
