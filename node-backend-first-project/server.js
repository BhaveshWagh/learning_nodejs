const http = require("http");

// create a simple server

const server = http.createServer((req, res) => {
  // set the response header to indicate the content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // send the response body "Hello, World!"
  res.end("name:bhavesh!");
});

// Define the port the server will listen on
const PORT = 3000;

// start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
