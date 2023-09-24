const http = require("http");

const port = 2020;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<html><body><p>This is my home Page.</p></body></html>`);
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<html><body><p>This is my About Page.</p></body></html>`);
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<html><body><p>This is my Contact Page.</p></body></html>`);
    res.end();
  } else res.end("Invalid Request");
});

server.listen(port, () => {
  console.log("");
  console.log("Server is listening to port on port", port);
});
