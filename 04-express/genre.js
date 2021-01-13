const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Anime" },
];
//GET

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.get("/genres", (req, res) => {
  res.send(genres);
});
app.get("/genres/:id", (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The ID choose not found');
    }
    res.send(genre);
  });
//POST
app.post("/genres", (req, res) => {
    //create genre and validate
    const genreValid = validator(req.body);
    const { error, value } = genreValid;

    //save validate property in new genre
    const newGenre = {
        id: genres.length + 1,
        name: value.name
    };
    genres.push(newGenre);
    //if error
    if (error) {
        return res.status(400).send(error.details[0].message);
    } 
    //send new list of genres.
    res.send(error);
  });

//PUT
app.put("/genres/:id", (req, res) => {
    //look up genre
    const genre = genres.find(m => m.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(400).send('bad request - The ID cannot be updated');
    }
    //validate new values entry
    const genreValid = validator(req.body);
    const { error } = genreValid;
    if (error) return res.status(400).send(error.details[0].message);

    //save new Value property in OLD genre
    const idx = genres.indexOf(genre);
    genres[idx].name = genreValid.value.name;
    res.send(genres);
  });



//DELETE
app.delete("/genres/:id", (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(400).send('bad request - The ID cannot be deleted');
    }
    const idx = genres.indexOf(genre);
    genres.splice(idx, 1);
    res.send(genres);
});

//DELETE
app.delete("/genres/:id", (req, res) => {
    const genre = genres.find(m => m.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(400).send('bad request - The ID cannot be deleted');
    }
    const idx = genres.indexOf(genre);
    genres.splice(idx, 1);
    res.send(genres);
});
    
    

//Validation
function validator(obj){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(obj, schema); 
}

//listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Connected at 3000");
});
