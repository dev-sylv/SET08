import fs from "fs";
const file = fs.createWriteStream("./big.file");

for (let i = 0; i <= 1000; i++) {
  file.write(`Welcome to my store room\n`);
}

function read() {
  const readableStream = fs.createReadStream("./big.file", "utf-8");

  readableStream.on("error", function (error) {
    console.log(`error: ${error.message}`);
  });

  readableStream.on("data", (chunk) => {
    console.log("Reading data from my big file", chunk);
  });
}

file;
read();
