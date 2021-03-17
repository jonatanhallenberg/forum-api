const express = require("express");
const app = express();
const port = 3000;

const Animal = require("./model/animal");
const Feeding = require("./model/feeding");
const User = require("./model/user");

const animalController = require("./controller/animalController");
const userController = require("./controller/userController");
const feedingController = require("./controller/feedingController");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const passport = require("./passport/setup");
app.use(passport.initialize());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dbUser:bsBpxUNm9XH30jFn@cluster0.dfdti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/animal", animalController.get);
app.post("/animal", animalController.post);
app.get("/animal/:id", animalController.getById);
app.delete("/animal/:id", animalController.delete);
app.put("/animal/:id", animalController.put);

app.post("/user", userController.post);

app.get("/animal/:id/feeding", feedingController.getByAnimal);
app.post("/animal/:id/feeding", feedingController.postByAnimal);
app.delete("/animal/:animalId/feeding/:feedingId", feedingController.deleteByAnimal);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});