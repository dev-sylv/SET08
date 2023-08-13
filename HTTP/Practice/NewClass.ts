// server.ts
import http from "http";
import { IncomingMessage, ServerResponse } from "http";

const PORT = 3000;

const TodoDB = [{ id: 1, text: "Learn TypeScript" }];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/todos") {
      const todos = JSON.stringify(TodoDB);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(todos);
    } else if (req.method === "POST" && req.url === "/todos") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const newTodo = JSON.parse(data);
        TodoDB.push(newTodo);
        // Here you can add the new todo to your data store
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(TodoDB));
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
