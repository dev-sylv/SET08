import axios from "axios";
import http, { ServerResponse, IncomingMessage } from "http";
import path from "path";
import fs from "fs";

const Port = 3400;

interface IMessage {
  message: string;
  sucess: boolean;
  data: null | {} | {}[];
}

const Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json");
    let { method, url } = req;
    let status = 404;

    let response: IMessage = {
      message: "Failed",
      sucess: false,
      data: null,
    };
    try {
      // When you hit a route it will give you all the details of the products.
      if (method === "GET" && url === "/getallproducts") {
      } else {
        (response.message = "Check your Routes"),
          (response.sucess = false),
          (response.data = null);

        res.write(JSON.stringify({ status, response }));
        res.end();
      }
    } catch (error) {
      (response.message = "An error occured"),
        (response.sucess = false),
        (response.data = error);

      res.write(JSON.stringify({ status, response }));
      res.end();
    }
  }
);

Server.listen(Port, () => {
  console.log("Server is running on port", Port);
});
