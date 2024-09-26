const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();


//middleware
app.use(express.json());

// db instance (db connection)
// Here we have created a database already
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

// if you want to create db dynamically or runtime  use the following code and make sure comment out the database: "dbName" in the above code
db.connect((err) => {
  // db.query("CREATE DATABASE testDb", function(err, result)
  //   {
  //     if(err) throw err;
  //     console.log("databse has been created")
  //   })
  if (err) throw err;
  console.log("Mysql has been connected successfully");
});

//api
app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/get-user", (req, res) => {
  db.query("SELECT * FROM user", {}, (err, data) => {
    if (err) console.log(err);
    console.log(data);
    return res.status(200).json(data);
  });
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  const { id, name, email, password } = req.body;
  db.query(
    `INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)`,
    [id, name, email, password],
    (err, data) => {
      if (err) console.log(err);
      console.log(data);
      return res.status(201).json("User created successfully");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`server us running on PORT:${process.env.PORT}`);
});
