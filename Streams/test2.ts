import fs from "fs";

const streaming = async () => {
  const readStream = fs.createReadStream("./NameFolder/name.txt", {
    highWaterMark: 10,
  });

  const writStreme = fs.createWriteStream("./NameFolder/NewName.txt");

  readStream.on("data", (buffer) => {
    console.log("Reading Data");
    console.log(buffer.toString());

    writStreme.write(buffer);
  });

  readStream.on("end", () => {
    console.log("Read Sucessfull");

    writStreme.end("Writting Sucessfull...")
  });
};

streaming();
