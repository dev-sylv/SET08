import http, { IncomingMessage, ServerResponse } from "http";
const port: number = 9999;

interface iData {
  id: number;
  name: string;
  phone: number;
  stack: string;
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const set08: iData[] = [
  {
    id: 1,
    name: "joan",
    phone: 8023474637,
    stack: "Full-Stack",
  },
  {
    id: 2,
    name: "Habib",
    phone: 8023474637,
    stack: "Full-Stack",
  },
  {
    id: 3,
    name: "Daniel",
    phone: 8023474637,
    stack: "Full-Stack",
  },
  {
    id: 4,
    name: "SEAN",
    phone: 8023474637,
    stack: "Full-Stack",
  },
  {
    id: 5,
    name: "joan",
    phone: 8023474637,
    stack: "Full-Stack",
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/Json");
    const { method, url } = req;
    let status: number = 404;

    let response: iMessage = {
      message: "failed",
      success: false,
      data: null,
    };
    const container: any = [];
    req
      .on("data", (chunk: any) => {
        container.push(chunk);
      })
      .on("end", () => {
        //Get method
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "All set08 data gotten";
          response.success = true;
          response.data = set08;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }

        //post method
        if (url === "/" && method === "POST") {
          status = 201;
        }

        //patch method
        //put method
      });
  }
);

server.listen(port, () => {
  console.log("");
  console.log("Server is up and running");
});
