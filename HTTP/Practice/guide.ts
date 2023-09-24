import http from "http";

interface iData {
  id: number;
  name: string;
  stack: string;
  contact: number;
}

interface Data {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

let dataSet: iData[] = [
  {
    // id: Math.floor(Math.random() * 100),
    id: 1,
    name: "Peter",
    stack: "Node JS",
    contact: 813720442,
  },
  {
    // id: Math.floor(Math.random() * 100),
    id: 2,
    name: "Bukky",
    stack: "Vue JS",
    contact: 813720442,
  },
  {
    // id: Math.floor(Math.random() * 100),
    id: 3,
    name: "Esther",
    stack: "Next JS",
    contact: 813720442,
  },
  {
    // id: Math.floor(Math.random() * 100),
    id: 4,
    name: "James",
    stack: "React JS",
    contact: 813720442,
  },
];

const port: number = 2344;

const app = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const { method, url } = req;

    res.setHeader("Content-Type", "application/json");

    let status: number = 404;
    let response: Data = {
      message: "fail",
      success: false,
      data: null,
    };

    const body: any = [];

    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        if (method === "GET" && url === "/") {
          status = 200;
          response.message = "All Entries found";
          response.success = true;
          response.data = dataSet;
        }

        if (method === "COPY") {
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);

          dataSet = dataSet!.filter((el) => {
            return el.id === dataValue;
          });

          status = 200;
          response.message = "All Entries found";
          response.success = true;
          response.data = dataSet;
        }

        if (method === "POST" && url === "/") {
          status = 201;
          let data = JSON.parse(body);
          dataSet!.push(data);

          response.message = "creating new Entries";
          response.success = true;
          response!.data = dataSet;
        }

        if (method === "DELETE") {
          status = 201;
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);
          console.log(dataValue);

          dataSet = dataSet.filter((el) => {
            return el.id !== dataValue;
          });

          response.message = "Deleting an Entry";
          response.success = true;
          response.data = dataSet;
        }

        if (method === "PATCH") {
          let build = JSON.parse(body);
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);

          dataSet = dataSet.filter((el) => {
            return el.id === dataValue;
          })[0].stack = build;

          status = 200;
          response.message = "updating Entry found";
          response.success = true;
          response.data = dataSet;
        }

        if (method === "PUT") {
          let build = JSON.parse(body);
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);

          let x = dataSet!.find((el) => {
            return el.id === dataValue;
          });

          status = 200;
          response.message = "updating Entry found";
          response.success = true;
          response.data = x!.stack = build;
        }

        if (method === "GET") {
          let val: string = req?.url!.split("/")[1];
          let dataValue: number = parseInt(val);

          let x = dataSet!.find((el) => {
            return el.id === dataValue;
          });

          console.log(x);

          status = 200;
          response.message = "GET Single Entry found";
          response.success = true;
          response.data = x!;
        }

        res.write(JSON.stringify({ status, response }));

        res.end();
      });
  }
);

app.listen(port, () => {
  console.log("");
  console.log("Let's do this...!");
  console.log("");
});
