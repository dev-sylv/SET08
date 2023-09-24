import http, { IncomingMessage, ServerResponse } from "http";

import fs from "fs";
import path from "path";

const port: number = 2004;

let data = [
  { id: 1, name: "Peter", stack: "small stack" },
  { id: 2, name: "Gideon", stack: "project manager" },
  { id: 3, name: "Mr Joe", stack: "full stack" },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.statusCode = 200;

    res.setHeader("content-type", "text/html");

    // res.writeHead(200);
    // res.write("My home pages in services");

    if (req.method === "GET" && req.url === "/" && res.statusCode === 200) {
      res.setHeader("Content-Type", "application/json");

      res.write(JSON.stringify(data));
      res.end();
    }
    res.end();

    // let connect: string = "pages/";

    // switch (req.url) {
    //   case "/":
    //     connect += "Home.html";
    //     res.statusCode = 200;
    //     break;
    //   case "/about":
    //     connect += "About.html";
    //     res.statusCode = 200;
    //     break;
    //   case "/contact":
    //     connect += "Contact.html";
    //     res.statusCode = 200;
    //     break;
    //   default:
    //     connect += "404.html";
    //     res.statusCode = 404;
    //     break;
    // }

    // fs.readFile(path.join(__dirname, connect), (data, err) => {
    //   if (err) {
    //     console.log("An error occured", err);
    //     res.end();
    //   } else {
    //     res.write(data);
    //     res.end();
    //   }
    // });
  }
);

server.listen(port, () => {
  console.log("");
  console.log(`Opening PORT: ${port} IN MY SERVER.`);
});
