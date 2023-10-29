const fs = require("fs");

const TextIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(TextIn);

const textOut = `This is what we know about the avocado : ${TextIn}.\nCreated On ${Date.now()} `;
fs.writeFileSync("./txt/outPut.txt", textOut);
console.log("File Written");
