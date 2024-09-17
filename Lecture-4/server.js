const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

// file-import
const userModel = require("./userSchema");
const isAuth = require("./isAuthMiddleware");
require("dotenv").config(); // Load environment variables

// constants
const app = express();
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`;
// store is created
const store = new mongodbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

//db connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json()); // json data
app.use(express.urlencoded({ extended: true })); //form body parser : It will help you to convert "form data" into readable formate.

app.use(
  session({
    secret: "This is sep nodejs class",
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

//api
app.get("/", (req, res) => {
  return res.send("Server is up and running");
});

// http://localhost:8000/create-user hit this api inside postman with post method and
// goto to the body select raw and type JSON

// app.post("/create-user", async (req, res) => {
//   console.log(req.body);
//   return res.send("All Ok!:)");
// });

app.get("/register-form", (req, res) => {
  return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>form</title>
</head>
<body>
    <h1>Registration form</h1>

    <form action="/register" method="POST">
        <label for="name">Name :</label>
        <input type="text" name="name" id="name">
        <label for="email">Email :</label>
        <input type="email" name="email" id="email">
        <label for="password">Password :</label>
        <input type="password" name="password" id="password">
        <button type="submit">Submit</button>
    </form>
</body>
</html>`);
});

// old code

app.post("/register", async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  const userObj = new userModel({
    name: name,
    email: email,
    password: password,
  });

  console.log(userObj);

  try {
    const userDb = await userObj.save();

    return res.status(201).json({
      message: "User created successfully",
      data: userDb,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/login-form", (req, res) => {
  return res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          <h1>login Form</h1>

          <form action="/login" method="POST">
              <label for="email">Email :</label>
              <input type="text" id="email" name="email"><br>
              <label for="password">Password :</label>
              <input type="text" id="password" name="password"><br>

              <button type="submit">Submit</button>
          </form>

      </body>
      </html>`);
});

app.post("/login", async (req, res) => {
  // find user with email
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const userDb = await userModel.findOne({ email: email });
    console.log("line 114", userDb);

    // check: if uesrDb is null
    if (!userDb)
      return res.status(400).json("User not found, please register first");
    // compare the password
    // console.log(password, userDb.password)
    // just null check
    if (password !== userDb.password)
      return res.status(400).json("Incorrect password");

    // successfully login
    console.log(req.session);
    req.session.isAuth = true;

    return res.status(200).json("Login successfull");
  } catch (error) {
    return res.status(500).json(error);
  }

  // userModel.findOne({email})
  // return res.send("All ok");
});

app.get("/test", isAuth, (req, res) => {
  console.log(req.session);
  return res.send("Private data......");
});
app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
