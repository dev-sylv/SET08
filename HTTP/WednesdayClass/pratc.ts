import fs from "fs";
import path from "path";

const folderpath = path.join(__dirname, "CrudPractice");

// Creating folder for the file:
if (!fs.existsSync(folderpath)) {
  fs.mkdir(folderpath, (error) => {
    if (error) {
      console.log("An error occured", error);
    } else {
      console.log("Folder created");
    }
  });
} else {
  console.log("Folder already exists");
}
// 2. How to write into a new file. Create a new file and write into it.
const write = "I want to write into the file.";
fs.writeFile(
  path.join(__dirname, "./reactFolder", "reactFile"),
  write,
  (error) => {
    if (error) {
      console.log("Error in writing into file");
    } else {
      console.log("Written into the new file created successfully");
    }
  }
);

// 3. How to update an already existing file:
const append = "\nMy name is sylvia.";
fs.appendFile(
  path.join(__dirname, "./reactFolder", "reactFile"),
  append,
  (error) => {
    if (error) {
      console.log("Error in updating file");
    } else {
      console.log("File updated successfully");
    }
  }
);

// 4. How to read information in a file.
fs.readFile(
  path.join(__dirname, "./reactFolder", "reactFile"),
  "utf-8",
  (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      console.log("This is the information in the file:", data);
    }
  }
);

// 5. How to delete an already existing folder:
fs.rm("./reactFolder", { recursive: true }, (error) => {
  if (error) {
    console.log("Couldn't delete folder");
  } else {
    console.log("Folder successfully deleted");
  }
});

// fs.unlink............to delete a file.
