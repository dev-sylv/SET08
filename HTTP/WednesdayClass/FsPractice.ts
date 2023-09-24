// import { error, log } from "console";
// import fs, { writeFile } from "fs";
// import path from "path";

// // if (!fs.existsSync("./CRUD")) {
// //   fs.mkdir("./CRUD", (error): void => {
// //     if (error) {
// //       console.log("an error occurred", error);
// //     } else {
// //       console.log("folder created successfully");
// //     }
// //   });
// // } else {
// //   console.log("Folder already exists");
// // }
// // const msg2 = "Hello world";

// // fs.writeFile(
// //   path.join(__dirname, "../CRUD", "newfile.txt"),
// //   msg2,
// //   (error): void => {
// //     if (error) {
// //       console.log("an error occured", error);
// //     } else {
// //       console.log("file created");
// //     }
// //   }
// // );

// // const newMsg = `\n hey`;

// // fs.appendFile(
// //   path.join(__dirname, "../CRUD", "newfile.txt"),
// //   newMsg,
// //   (error): void => {
// //     if (error) {
// //       console.log("chaii");
// //     } else {
// //       console.log("ok");
// //     }
// //   }
// // );

// // fs.readFile(
// //   path.join(__dirname, "../CRUD", "newfile.txt"),
// //   "utf-8",
// //   (error, data): void => {
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log(data);
// //     }
// //   }
// // );

// // fs.unlink(path.join(__dirname, "../CRUD/newfile.txt"), (error): void => {
// //   if (error) {
// //     console.log("Sorry", error);
// //   } else {
// //     console.log("Sucessfully Unlinked");
// //   }
// // });

// fs.rm(path.join(__dirname, "../CRUD"), { recursive: true }, (error) => {
//   if (error) {
//     console.log("Error occured", error);
//   } else {
//     console.log("Deleted everything");
//   }
// });
