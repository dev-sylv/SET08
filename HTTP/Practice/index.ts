import http, { IncomingMessage, ServerResponse } from "http";

const port = 2034;

interface Data {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

let db: any = [
  { id: 1, username: "sylvia", phoneno: "09061180473" },
  { id: 2, username: "Daniel", phoneno: "08052827585" },
  { id: 3, username: "Feyikemi", phoneno: "09087654312" },
  { id: 4, username: "Codelab", phoneno: "08076896898" },
];

const myServer = http.createServer(
  (req: any, res: ServerResponse<IncomingMessage>): void => {
    res.setHeader("content-Type", "application/json");
    const { method, url } = req;

    let status: number = 404;
    let response: Data = {
      message: "fail",
      success: false,
      data: null,
    };

    const body: any = [];

    req
      .on("data", (chunk: any) => {
        body.push(chunk);
      })
      .on("end", () => {
        // GET METHOD(READ):
        if (url === "/" && method === "GET") {
          status = 200;
          response.message = "All Entries found";
          response.success = true;
          response.data = db;

          res.write(JSON.stringify({ status, response }));

          res.end();
        }

        // POST METHOD(CREATE, UPLOAD, WRITE, ADD):
        if (method === "POST" && url === "/") {
          status = 201;

          const data = JSON.parse(body);
          db.push(data);

          res.statusCode = 201; // Created
          response.message = "creating new Entries";
          response.success = true;
          response!.data = db;
          res.write(JSON.stringify({ status, response }));

          res.end();
        }

        // PATCH METHOD:
        if (method === "PATCH") {
          if (!body) {
            // Handle the case where the request body is empty
            status = 400; // Bad Request
            response.message = "Request body is empty";
            response.success = false;

            res.write(JSON.stringify({ status, response }));

            res.end();
          } else {
            let build = JSON.parse(body);

            let val: string = req?.url!.split("/")[1];
            let dataValue: number = parseInt(val);
            console.log("dataValue", dataValue);

            const updatedElementIndex = db.findIndex(
              (el: any) => el.id === dataValue
            );
            console.log("updatedElementIndex", updatedElementIndex);

            const idExists = db.some((user: any) => user.id === dataValue);

            console.log("er", idExists);

            if (idExists === false) {
              status = 404;
              response.message = "user not found".toUpperCase();
              response.success = false;
              res.write(JSON.stringify({ status, response }));
              res.end();
            } else {
              const getNewUserName = build?.username;

              db = db.map((user: any) => {
                if (user.id === dataValue) {
                  return {
                    id: user.id,
                    username: getNewUserName,
                    phoneno: user.phoneno,
                  };
                }
                return user;
              });

              status = 200;
              response.message = "updating Entry found";
              response.success = true;
              response.data = db!;

              res.write(JSON.stringify({ status, response }));
            }
            res.end();
          }
        }
        // PUT METHOD:
        if (method === "PUT") {
          if (!body) {
            // Handle the case where the request body is empty
            status = 400; // Bad Request
            response.message = "Request body is empty";
            response.success = false;

            res.write(JSON.stringify({ status, response }));

            res.end();
          } else {
            let build = JSON.parse(body);

            let val: string = req?.url!.split("/")[1];
            let dataValue: number = parseInt(val);

            const idExists = db.some((user: any) => user.id === dataValue);

            console.log("er", idExists);

            if (idExists === false) {
              status = 404;
              response.message = "user not found".toUpperCase();
              response.success = false;
              res.write(JSON.stringify({ status, response }));
              res.end();
            } else {
              const getNewUserName = build?.username;
              const getNewPhoneNo = build?.phoneno;

              db = db.map((user: any) => {
                if (user.id === dataValue) {
                  return {
                    id: user.id,
                    username: getNewUserName,
                    phoneno: getNewPhoneNo ? getNewPhoneNo : user?.phoneno,
                  };
                }
                return user;
              });

              status = 200;
              response.message = "updating Entry found";
              response.success = true;
              response.data = db!;

              res.write(JSON.stringify({ status, response }));
            }
            res.end();
          }
        }

        // DELETE METHOD(DELETE)
        if (method === "DELETE") {
          status = 201;
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);
          console.log(dataValue);

          let test = db.filter((el: any) => {
            return el.id !== dataValue;
          });
          db = test;

          response.message = "Deleting an Entry";
          response.success = true;
          response.data = db;

          res.write(JSON.stringify({ status, response }));

          res.end();
        }
      });
  }
);

myServer.listen(port, () => {
  console.log("");
  console.log("Server is listening on port", port);
});
