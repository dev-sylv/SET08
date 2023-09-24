import http, { ServerResponse, IncomingMessage } from "http";

const port = 3000;
interface iMassege {
  message: string;
  data: null | [] | {}[];
  success: boolean;
}

interface iData {
  id: number;
  name: string;
  age: number;
}
let Data: iData[] = [
  {
    id: 1,
    name: "Joan",
    age: 19,
  },
  {
    id: 2,
    name: "Dan",
    age: 19,
  },
  {
    id: 3,
    name: "Joan",
    age: 19,
  },
  {
    id: 4,
    name: "Joan",
    age: 19,
  },
];
const Server = http.createServer(
  (req: IncomingMessage, resp: ServerResponse<IncomingMessage>) => {
    resp.setHeader("content-Type", "application/json");

    const { method, url } = req;

    let Status: number = 404;

    let response: iMassege = {
      message: "Failed",
      success: false,
      data: null,
    };

    let Container: any = [];
    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        //GET Method
        if (url === "/home" && method === "GET") {
          Status = 200;
          response.message = "Successful";
          response.success = true;
          response.data = Data;
          resp.write(JSON.stringify({ response, Status }));

          resp.end();
        }
        //post method
        if (url === "/" && method === "POST") {
          Status = 201;
          const body = JSON.parse(Container);
          Data.push(body);

          response.message = "Added Successfully";
          response.success = true;
          response.data = Data;

          resp.write(JSON.stringify({ response, Status }));

          resp.end();
        }
        // PATCH METHOD:
        if (method === "PATCH") {
          const build = JSON.parse(Container);

          let details: any = url?.split("/")[1];
          let datavalue = parseInt(details);

          let findobject = Data.some((el) => {
            return el.id === datavalue;
          });

          if (findobject === false) {
            Status = 404;

            (response.message = "User not Found"),
              (response.data = null),
              (response.success = false);

            resp.write(JSON.stringify({ response, Status }));

            resp.end();
          } else {
            const updateusername = build.name;

            Data = Data.map((user: any) => {
              if (user?.id === datavalue) {
                return {
                  id: user?.id,
                  name: updateusername,
                  age: user?.age,
                };
              }

              return user;
            });

            Status = 200;

            (response.message = "User Updated"),
              (response.data = Data),
              (response.success = true);

            resp.write(JSON.stringify({ response, Status }));

            resp.end();
          }
        }
        // PUT METHOD:
        if (method === "PUT") {
          const build = JSON.parse(Container);

          let details: any = url?.split("/")[1];
          let datavalue = parseInt(details);

          let findobject = Data.some((el) => {
            return el.id === datavalue;
          });

          if (findobject === false) {
            Status = 404;

            (response.message = "User not Found"),
              (response.data = null),
              (response.success = false);

            resp.write(JSON.stringify({ response, Status }));

            resp.end();
          } else {
            const updateusername = build.name;
            const updateage = build.age;

            Data = Data.map((user: any) => {
              if (user?.id === datavalue) {
                return {
                  id: user?.id,
                  name: updateusername,
                  age: updateage,
                };
              }

              return user;
            });

            Status = 200;

            (response.message = "User Updated"),
              (response.data = Data),
              (response.success = true);

            resp.write(JSON.stringify({ response, Status }));

            resp.end();
          }
        }
      });
  }
);

Server.listen(port, () => {
  console.log("server is up and running");
});
