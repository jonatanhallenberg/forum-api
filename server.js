const express = require("express");
const app = express();
const port = 8080;
const Sandbox = require("./model/sandbox");
const Feeding = require("./model/category");
const User = require("./model/user");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())

const sandboxController = require("./controller/sandboxController");
const userController = require("./controller/userController");
const categoryController = require("./controller/categoryController");
const threadController = require("./controller/threadController");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const passport = require("./passport/setup");
app.use(passport.initialize());

const sandboxMiddleware = require('./middleware/sandboxMiddleware');

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dbUser:bsBpxUNm9XH30jFn@cluster0.dfdti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Sandbox
app.post("/sandbox", sandboxController.post);

//User
app.post("/user", userController.post);

//Category
app.post("/sandbox/:sandboxName/category", sandboxMiddleware, categoryController.post);
app.get("/sandbox/:sandboxName/category", sandboxMiddleware, categoryController.get);
app.delete("/sandbox/:sandboxName/category/:categoryId", sandboxMiddleware, categoryController.delete)

//Thread
app.post("/sandbox/:sandboxId/category/:categoryId/thread", threadController.post);
app.get("/sandbox/:sandboxId/category/:categoryId/thread", threadController.get);
app.delete("/sandbox/:sandboxId/category/:categoryId/thread/:threadId", threadController.delete);

//Comment
//app.post("/sandbox/:sandboxId/category/:categoryId/thread/:threadId/comment", commentController.post);
//app.get("/sandbox/:sandboxId/category/:categoryId/thread/:threadId/comment", commentController.post);
//app.delete("/sandbox/:sandboxId/category/:categoryId/thread/:threadId/comment/:commentId", commentController.post);

//Likes
//app.post()



//Like


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});