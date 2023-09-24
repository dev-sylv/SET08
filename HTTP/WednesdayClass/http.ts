import http, { IncomingMessage, ServerResponse } from "http";

const port: number = 2000;

const data = [
  {
    id: 1,
    name: "Daniel",
  },
  {
    id: 2,
    name: "caleb",
  },
  {
    id: 3,
    name: "Tobi",
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    if (req.url === "/" && req.method === "GET" && res.statusCode === 200) {
      res.writeHead((res.statusCode = 200), {
        "content-type": "text/html",
      });
      console.log("");
      const data = req.rawHeaders[7].split('"')[9];
      const data1 = req.rawHeaders[11];
      const data2 = req.rawHeaders[15];
      res.write(
        `You are using ${data} to access me. \n\n You are operating me from a ${data1} OS. \n\n and to be specific ${data2} device is what you are using`
      );
      console.log("Data: ", data);
      console.log("Data1111: ", data1);
      console.log("Data2222: ", data2);
      const Postdata = req.rawHeaders[6].split("-")[0];
      console.log("Postdata: ", Postdata);

      // res.setHeader("Content-type", "application/JSON");
      // console.log("first", req.rawHeaders[5]);
      // res.write(JSON.stringify(data));
      res.end();
    }

    // if (req.url === "/" && req.method === "POST" && res.statusCode === 200) {
    //   res.setHeader("Content-type", "application/JSON");
    //   const addhere = { id: 4, name: "jessica" };
    //   const allData = data.push(addhere);
    //   res.write(JSON.stringify(allData));
    //   res.end();
    // }

    // console.log("Request: ", req.rawHeaders[5]);
    // console.log(`You are using ${req.rawHeaders[5]} to access me`);
  }
);
server.listen(port, () => {
  console.log("");
  console.log("Listening to port", port);
});
