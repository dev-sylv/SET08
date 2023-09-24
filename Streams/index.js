const fs = require("fs");

const file = fs.createWriteStream("./streamFile.txt");

for (let i = 0; i < 1000; i++) {
  file.write("Welcome to set08 class\n");
}

file;
