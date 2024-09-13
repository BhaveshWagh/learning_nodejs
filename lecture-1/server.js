// Importing the express module using ES5 syntax
// Step 1
const express = require("express");
// For ES6 syntax, use: import express from 'express';

// Step 2
// Creating an instance of an Express application and storing it in the 'app' variable
const app = express();

// Step 4
// Creating a GET API endpoint

// The 'get' method takes two parameters:
// 1. The endpoint (e.g., '/about', '/login') as a string.
// 2. A controller function (callback) that defines the behavior of the API.
//    This controller function receives two arguments:
//    - 'req' (the request object) that contains information about the HTTP request.
//    - 'res' (the response object) that is used to send a response back to the client.

app.get("/home", (req, res) => {
  console.log("Home API is working!");
  // When the client makes a request, the server sends this response.
  res.send("Cool!, Server is up and running.");
  // To test, go to: http://localhost:8000/home

  console.log('Running')
});

// Step 3
// An event-driven server should listen for requests from the client side.
// 'app.listen()' is used to bind and listen for connections on the specified port.
app.listen(8000, () => {
  console.log("Server is running on PORT: 8000");
});
