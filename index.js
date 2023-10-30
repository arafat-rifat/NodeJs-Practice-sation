const fs = require("fs");
const http = require("http");
// const { json } = require("stream/consumers");
const url = require("url");

//////////////////////////////////////////////
/////Files reading and writing///////////////

// Blocking Syncronus Way
// const TextIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(TextIn);

// const textOut = `This is what we know about the avocado : ${TextIn}.\nCreated On ${Date.now()} `;
// fs.writeFileSync("./txt/outPut.txt", textOut);
// console.log("File Written");

// Non Blocking Asyncronus Way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.writeFile("./txt/final.txt", `${data2}\n${data1}`, "utf-8", (err) => {
//       console.log("Your File has been written!!");
//     });
//   });
// });
// console.log("Asyncronous Way!!");

//////////////////////////////////////////////
/////----SERVER----///////////////
// Creating a simple Web server
// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.end("Hello fROM the Server Site!!!");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });

//////////////////////////////////////////////
/////----Routing----///////////////

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OverView!!!");
//   } else if (pathName === "/product") {
//     res.end("This is the Product!!!");
//   } else {
//     res.writeHead(404, {
//       "Content-Type": " text/html",
//     });
//     res.writeHead(404);
//     res.end("<h1>PAGE NOT FOUND!!!!!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });

//////////////////////////////////////////////
/////----Build A simple Api----///////////////

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OverView!!!");
  } else if (pathName === "/product") {
    res.end("This is the Product!!!");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-Type": " text/html",
    });
    res.end("<h1>PAGE NOT FOUND!!!!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
