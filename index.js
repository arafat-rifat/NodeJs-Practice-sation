const fs = require("fs");

// Blocking Syncronus Way
// const TextIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(TextIn);

// const textOut = `This is what we know about the avocado : ${TextIn}.\nCreated On ${Date.now()} `;
// fs.writeFileSync("./txt/outPut.txt", textOut);
// console.log("File Written");

// Non Blocking Asyncronus Way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});
console.log("Asyncronous Way!!");
