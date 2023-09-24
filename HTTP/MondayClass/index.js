const http = require("http");

const port = 2003;

const server = http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.write("Server is up and running");
  //   res.end();

  if (req.url === "/") {
    // Setting the response header
    res.writeHead(200, { "content-Type": "text/html" });

    // Setting the response content
    res.write(`<html><body><p>This is the home page</p></body></html>`);
    res.end();
  } else if (req.url === "/student") {
    res.writeHead(200, { "content-Type": "text/html" });

    // Setting the response content
    res.write(`<html><body><p>This is the student page</p></body></html>`);
    res.end();
  } else if (req.url === "/codelab") {
    res.writeHead(200, { "content-Type": "text/html" });

    // Setting the response content
    res.write(`<html><body><p>This is the CodeLab page</p></body></html>`);
    res.end();
  } else res.end("Invalid request");
});

server.listen(port, () => {
  console.log("");
  console.log(`Lisening to port on port ${port}`);
});
