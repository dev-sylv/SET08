import http, { IncomingMessage, ServerResponse } from "http";

const port = 3500;

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const { method, url } = req;

    res.setHeader("Content-Type", "application/json");

    // Perform the read operation using GET method:
    if (method === "GET" && url === "/" && res.statusCode === 200) {
      res.writeHead(200);
      res.write(JSON.stringify(users));
      res.end();
    }

    // Perform the create operation using POST method:
    if (method === "POST" && url === "/" && res.statusCode === 200) {
      console.log("first");

      let requestBody: any = [];

      req.on("data", (chunk) => {
        requestBody.push(chunk);
        console.log("chunk", chunk.toString());
      });
      console.log("requestbody here", requestBody);

      req.on("end", () => {
        try {
          console.log("second");
          const newUser = JSON.parse(requestBody);
          users.push(newUser);
          res.write(JSON.stringify(users));
          // res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(requestBody));
        } catch (error) {
          // Handle JSON parsing error
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON data" }));
        }
      });
    }
  }
);

// Start the server
server.listen(port, () => {
  console.log("");
  console.log(`Server is listening on port ${port}`);
});

// Sample data (in-memory database)

// // Create (POST)
// app.post("/users", (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // Read (GET user by ID)
// app.get("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

// // Update (PUT)
// app.put("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const updatedUser = req.body;

//   users = users.map((user) => {
//     if (user.id === userId) {
//       return { ...user, ...updatedUser };
//     }
//     return user;
//   });

//   res.json(updatedUser);
// });

// // Delete (DELETE)
// app.delete("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   users = users.filter((user) => user.id !== userId);
//   res.json({ message: "User deleted" });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
