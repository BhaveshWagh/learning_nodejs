const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userSchema");
require('dotenv').config(); 

const app = express();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`;

//db connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json()); // parsing JSON payloads.
// app.use(express.urlencoded({extended : true}))       // for parsing URL-encoded data. && form body parser 

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

app.post("/create-user", async (req, res) => {
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

    // const userDb1 = await userModel.create({
    //   name: name,
    //   username: username,
    //   password: password,
    // });

    return res.send({
      status: 201,
      data: userDb,
    });
    // return res.status(201).json(userDb);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
