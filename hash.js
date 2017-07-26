const fs = require("fs");
const crypto = require("crypto");
const hash = crypto.createHash("md5");

let readableStream = fs.createReadStream("chat1.txt", "utf8");
let writeableStream = fs.createWriteStream("chat12.txt");
 
readableStream
	.pipe(hash)
	.pipe(writeableStream);
