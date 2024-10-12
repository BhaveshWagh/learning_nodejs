const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`${req.method} request made to: ${req.url}`);

  if (req.url === "/fileupload" && req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the form:", err);
        return res.end("Error uploading file.");
      }

      console.log("Uploaded files:", files);

      // Access the first file from the array
      const file = files.fileToUpload[0]; // Changed to access the first element of the array
      const oldPath = file.filepath;
      const newPath = path.join(__dirname, "uploads", file.originalFilename);

      // Ensure the 'uploads' directory exists
      fs.mkdir(path.join(__dirname, "uploads"), { recursive: true }, (err) => {
        if (err) throw err;

        // Copy the file to the new location
        fs.copyFile(oldPath, newPath, (err) => {
          if (err) throw err;

          console.log("File was copied successfully");

          // Delete the temporary file
          fs.unlink(oldPath, (err) => {
            if (err) throw err;
            console.log("Temporary file deleted from old path.");
            return res.end("File uploaded successfully");
          });
        });
      });
    });
  } else if (req.method === "GET" && req.url === "/") {
    // Serve the HTML form
    fs.readFile("form.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data);
    });
  } else {
    // Handle other routes or methods
    res.writeHead(405, { "Content-Type": "text/plain" });
    return res.end(`Method not allowed for ${req.url}`);
  }
});

server.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
