const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./Modules/ReplaceTamplate");

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/tamplate-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/tamplate-product.html`,
  "utf-8"
);

const tempCarts = fs.readFileSync(
  `${__dirname}/templates/tamplate-carts.html`,
  "utf-8"
);
// console.log("🚀 ~ file: index.js:93 ~ tempCarts:", tempCarts);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// console.log("🚀 ~ file: index.js:97 ~ dataObj:", dataObj);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OverView Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": " text/html",
    });

    const cardHtml = dataObj
      .map((el) => {
        // console.log("🚀 ~ file: index.js:110 ~ server ~ el:", el);
        return replaceTemplate(tempCarts, el);
      })
      .join("");
    // console.log("🚀 ~ file: index.js:111 ~ server ~ cardHtml:", cardHtml);

    const outPut = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(outPut);
  }
  // For Product Page
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // For API
  else if (pathname === "/api") {
    res.end(data);
    // Not Found
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
