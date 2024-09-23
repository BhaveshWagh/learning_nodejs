const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userSchema");

const app = express();

const MONGO_URL = `mongodb+srv://adminNode:admin1234@cluster0.0vhtt.mongodb.net/testingDb`;

// db connect
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("mongoose error :" + err));

// middleware : parser convert into json
app.use(express.json());

app.get("/home", (req, res) => {
  console.log("Route API is working fine!");
  res.send("Cool! ");
});

// app.post("/create-user", async (req, res) => {

//   console.log(req.body);

//   res.send("all okk");
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
  console.log("Server is running on PORT: 8000");
});
