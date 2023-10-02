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
