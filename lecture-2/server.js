const express = require("express");

const app = express();

// middlware
const fun = (req, res, next) => {
  console.log("middleware is working");
  next();
};

// Global middleware
app.use(fun);

// api

app.get("/", (req, res) => {
  return res.send("Server is up and running");
});

app.get("/api", fun, (req, res) => {
  console.log("api is working");
  return res.send("API is Working fine");
});

app.get("/api1", (req, res) => {
  console.log("api1 is working. Cool!");
  return res.send("API1 is Working cool");
});

// query
// ?key=value

app.get("/add", (req, res) => {
  console.log(req.query);
  const value = req.query.key;
  //   const val = req.query.name;
  return res.send(`Query value is name : ${value}`);
});

// ?key=val
app.get("/add1", (req, res) => {
  console.log(req.query);
  //   const val = req.query.key;
  console.log("***" + req.query.key);
  return res.send(`Query value is Key `);
});

// multiple query with the help of & operator
// ?key1=val1&key2=val2
// ex : http://localhost:8000/sub?key1=100&key2=200

app.get("/sub", (req, res) => {
  console.log(req.query);
  const val1 = req.query.key1;
  const val2 = req.query.key2;
  return res.send(`Query value is Key1 : ${val1} & key2 : ${val2}`);
});

// ?key=val1,val2
// http://localhost:8000/mul?key=Akshay,saini

app.get("/mul", (req, res) => {
  console.log(req.query);
  console.log(req.query.key.split(","));
  const valArray = req.query.key.split(",");
  const val1 = valArray[0];
  const val2 = valArray[1];
  return res.send(`Query value is Key1 : ${val1} & key2 : ${val2}`);
});

// params
// for params always remember : below code missing that

// ex ""/profile/name" !== /profile/:name"

// ! http://localhost:8000/profile/bhavesh

// app.get("/profile/name", (req, res) => {
//   console.log(req.params);
//   const name = req.params.name;
//   return req.send(`Name: ${name}`);
// });

app.get("/profile/:name", (req, res) => {
  console.log(req.params);
  const name = req.params.name;
  return res.send(`Name : ${name}`);
});

// ! http://localhost:8000/profile/akshay/saini

app.get("/profile/:first/:last", (req, res) => {
  console.log(req.params);
  const name = req.params.name;
  const { first, last } = req.params;
  return res.send(`First name : ${first} & Last name : ${last}`);
});

// listen
app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
