// server.ts
import http, { IncomingMessage, ServerResponse } from "http";

const PORT = process.env.PORT || 3000;

// Dummy user data (replace with a database in a real application)
const users: { username: string; password: string }[] = [];

// Create an HTTP server
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/login" && req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const { username, password } = JSON.parse(data);
          const user = users.find(
            (u) => u.username === username && u.password === password
          );

          if (!user) {
            res.statusCode = 401;
            res.end(JSON.stringify({ error: "Invalid credentials" }));
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ message: "Login successful" }));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Invalid request data" }));
        }
      });
    } else if (req.url === "/register" && req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const { username, password } = JSON.parse(data);

          // Check if the username is already taken
          const existingUser = users.find((u) => u.username === username);
          if (existingUser) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Username is already taken" }));
            return;
          }

          // Store the new user
          users.push({ username, password });

          res.statusCode = 200;
          res.end(JSON.stringify({ message: "Registration successful" }));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "Invalid request data" }));
        }
      });
    } else if (req.url === "/users" && req.method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify({ users }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
