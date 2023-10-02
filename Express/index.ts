import express, { Application, Request, Response } from "express";

const port: number = 2300;

const app: Application = express();

app.use(express.json());

const db = [
  {
    id: 1,
    name: "Wisdom",
    email: "wisdom@gmail.com",
  },
  {
    id: 2,
    name: "Regina",
    email: "regina@gmail.com",
  },
  {
    id: 3,
    name: "Nzube",
    email: "nzube@gmail.com",
  },
];

// DEFAULT GET:
app.get("/", (req: Request, res: Response) => {
  res.send("My first express server");
});

// Get:
app.get("/get-all", (req: Request, res: Response) => {
  res.send(db);
});

// Post:
app.post("/add", (req: Request, res: Response) => {
  let newuser = req.body;
  db.push(newuser);
  res.json(db);
});

app.listen(port, () => {
  console.log("");
  console.log("Server is listening on port", port);
});
