import axios from "axios";
import http, { IncomingMessage, ServerResponse, createServer } from "http";

interface iMessage {
  message: string;
  data: null | {} | {}[];
  success: boolean;
}
const port = 2000;
const Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "Application/json");

    const { method, url } = req;

    let status: number = 404;

    const response: iMessage = {
      message: "failed",
      data: null,
      success: false,
    };

    let data = "";
    req
      .on("data", (chunk: any) => {
        data += chunk;
      })
      .on("end", async () => {
        if (method === "GET") {
          const Details: any = url?.split("/")[1];
          //   const datavalue = parseInt(Details);
          const usefulUrl = Details?.toString();

          const Fakestore = await axios.get(
            "https://fakestoreapi.com/products"
          );
          let Get = Fakestore.data;

          let check = Fakestore.some((el) => el.category === Details);

          if (check === true) {
            const category = Fakestore.filter((el) => {});
          }
          status = 200;
          response.message = `All ${Get.length} products has  been gotten`;
          response.data = Get;
          response.success = true;
          res.write(JSON.stringify({ response, status }));
          res.end();
        } else {
          response.message = "All data is been gotten failed";
          response.data = null;
          response.success = false;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
      });
  }
);

Server.listen(port, () => {
  console.log("server is listening to port", port);
});
