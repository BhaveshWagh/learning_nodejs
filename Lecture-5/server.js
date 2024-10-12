const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");

const server = http.createServer();

// read, write, readStream, delete, rename, append

server.on("request", (req, res) => {
  const data = "This is sep backend module.";

  console.log(req.url + " " + req.method);

  if (req.method === "GET" && req.url === "/") {
    return res.end("Server is up and running....");
  }
  //write
  else if (req.method === "GET" && req.url === "/writefile") {
    fs.writeFile("demo.txt", data, (err) => {
      if (err) throw err;
      return res.end("write successfully.");
    });
    return;
  }
  //append
  else if (req.method === "GET" && req.url === "/appendfile") {
    fs.appendFile("demo.txt", data, (err) => {
      if (err) throw err;
      return res.end("Append successfully");
    });
  }
  //read
  else if (req.method === "GET" && req.url === "/readfile") {
    fs.readFile("demo.txt", (err, data) => {
      if (err) throw err;
      console.log(data);
      return res.end(data);
    });
  }
  //delete
  else if (req.method === "GET" && req.url === "/deletefile") {
    fs.unlink("demo.txt", (err) => {
      if (err) throw err;
      return res.end("Delete successfully");
    });
  }
  //rename
  else if (req.method === "GET" && req.url === "/renamefile") {
    fs.rename("demo.txt", "newDemo.txt", (err) => {
      if (err) throw err;
      return res.end("Rename successfully");
    });
  }
  //stream read
  else if (req.method === "GET" && req.url === "/streamread") {
    // // Corrected the file path and added error handling
    // const filePath = path.join(__dirname, "demo.txt");
    // const rStream = fs.createReadStream(filePath);

    // // Handle the 'error' event
    // rStream.on("error", (err) => {
    //   res.writeHead(404, { "Content-Type": "text/plain" });
    //   res.end("File not found or an error occurred.");
    // });

    // // Stream the file content
    // rStream.on("data", (chunk) => {
    //   res.write(chunk);
    // });

    // rStream.on("end", () => {
    //   res.end();
    // });
    // instructore code is not working
    const rStream = fs.createReadStream("demo.txt");

    rStream.on("data", (char) => {
      res.end(char);
    });

    rStream.on("end", () => {
      return res.end();
    });
  } else {
    return res.end(`API not found : ${req.method} ${req.url}`);
  }
});

// upload files

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

// const http = require("http");
// const fs = require("fs");
// const formidable = require("formidable");
// const path = require("path");

// const server = http.createServer();

// // server.on("request", (req, res) => {
// //   const data = "This is sep backend module.";

// //   console.log(req.url + " " + req.method);

// //   if (req.method === "GET" && req.url === "/") {
// //     return res.end("Server is up and running....");
// //   }
// //   //write
// //   else if (req.method === "GET" && req.url === "/writefile") {
// //     fs.writeFile("demo.txt", data, (err) => {
// //       if (err) throw err;
// //       return res.end("write successfully.");
// //     });
// //     return;
// //   }
// //   //append
// //   else if (req.method === "GET" && req.url === "/appendfile") {
// //     fs.appendFile("demo.txt", data, (err) => {
// //       if (err) throw err;
// //       return res.end("Append successfully");
// //     });
// //   }
// //   //read
// //   else if (req.method === "GET" && req.url === "/readfile") {
// //     fs.readFile("demo.txt", (err, data) => {
// //       if (err) throw err;
// //       console.log(data);
// //       return res.end(data);
// //     });
// //   }
// //   //delete
// //   else if (req.method === "GET" && req.url === "/deletefile") {
// //     fs.unlink("demo.txt", (err) => {
// //       if (err) throw err;
// //       return res.end("Delete successfully");
// //     });
// //   }
// //   //rename
// //   else if (req.method === "GET" && req.url === "/renamefile") {
// //     fs.rename("demo.txt", "newDemo.txt", (err) => {
// //       if (err) throw err;
// //       return res.end("Rename successfully");
// //     });
// //   }
// //   //stream read
// //   else if (req.method === "GET" && req.url === "/streamread") {
// //     // // Corrected the file path and added error handling
// //     // const filePath = path.join(__dirname, "demo.txt");
// //     // const rStream = fs.createReadStream(filePath);

// //     // // Handle the 'error' event
// //     // rStream.on("error", (err) => {
// //     //   res.writeHead(404, { "Content-Type": "text/plain" });
// //     //   res.end("File not found or an error occurred.");
// //     // });

// //     // // Stream the file content
// //     // rStream.on("data", (chunk) => {
// //     //   res.write(chunk);
// //     // });

// //     // rStream.on("end", () => {
// //     //   res.end();
// //     // });
// //     // instructore code is not working
// //     const rStream = fs.createReadStream("demo.txt");

// //     rStream.on("data", (char) => {
// //       res.end(char);
// //     });

// //     rStream.on("end", () => {
// //       return res.end();
// //     });
// //   } else {
// //     return res.end(`API not found : ${req.method} ${req.url}`);
// //   }
// // });

// // How to upload a file

// // server.on("request", (req, res) => {
// //   if (req.url === "/fileupload" && req.method === "POST") {
// //     const form = new formidable.IncomingForm();

// //     form.parse(req, (err, fields, files) => {
// //       if (err) throw err;

// //       console.log("line 74", files);

// //       const file = files.fileToUpload[0];
// //       const oldPath = file.filepath; // Get the temp file path
// //       const newPath = path.join(__dirname, "uploads", file.originalFilename); // Construct the destination path

// //       // Ensure the 'uploads' directory exists
// //       fs.mkdir(path.join(__dirname, "uploads"), { recursive: true }, (err) => {
// //         if (err) throw err;

// //         // Copy file from old path to new path
// //         fs.copyFile(oldPath, newPath, (err) => {
// //           if (err) {
// //             console.log("*****", err);
// //             throw err;
// //           }

// //           console.log("file was copied successfully");

// //           // Delete the temporary file
// //           fs.unlink(oldPath, (err) => {
// //             if (err) throw err;
// //             console.log("file deleted from old path.");
// //             return res.end("File uploaded successfully");
// //           });
// //         });
// //       });
// //     });
// //   } else {
// //     fs.readFile("form.html", (err, data) => {
// //       if (err) throw err;
// //       return res.end(data);
// //     });
// //   }
// // });

// server.on("request", (req, res) => {
//   if (req.url === "/fileupload" && req.method === "POST") {
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//       if (err) throw err;
//       console.log("line 74", files);

//       const oldPath = files.fileToUpload[0].filepath;
//       const newPath =
//         __dirname + "/uploads/" + files.fileToUpload[0].originalFilename;

//       fs.copyFile(oldPath, newPath, (err) => {
//         if (err) throw err;

//         console.log("file was copied successfully");

//         fs.unlink(oldPath, (err) => {
//           if (err) throw err;
//           console.log("file deleted from old path.");
//           return res.end("File uploaded successfully");
//         });
//       });
//     });
//   } else {
//     fs.readFile("form.html", (err, data) => {
//       if (err) throw err;
//       return res.end(data);
//     });
//   }
// });

// server.listen(8000, () => {
//   console.log("Server is running on PORT:8000");
// });
