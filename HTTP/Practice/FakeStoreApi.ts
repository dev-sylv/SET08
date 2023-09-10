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
      //1. When you hit a route it will give you all the details of the products.
      if (method === "GET" && url === "/getallproducts") {
        let requestBody = "";

        req.on("data", (chunk) => {
          requestBody += chunk;
        });
        req.on("end", async () => {
          let requestData = JSON.parse(requestBody);

          const productendpoint = await axios.get(
            `https://fakestoreapi.com/products`
          );

          if (productendpoint.status) {
            const productDetails = productendpoint.data;

            // 2. Download all the images of the products. and place into a folder.
            const productImages = productDetails.avatar_url;
            const avatarfilename = `${productDetails.image}.jpg`;
            const avatarfolder = path.join(
              __dirname,
              "Product_Images",
              avatarfilename
            );

            const getavatarurl = await axios.get(productImages, {
              responseType: "stream",
            });

            getavatarurl.data.pipe(fs.createWriteStream(avatarfolder));

            // 3. Save the title of each of the products in a "Txt File"

            status = 200;

            (response.message = `All ${productDetails.length} products gotten successfully`),
              (response.sucess = true),
              (response.data = productDetails);

            res.write(JSON.stringify({ status, response }));
            res.end();
          } else {
            status = 404;

            (response.message = "Products not found"),
              (response.sucess = false),
              (response.data = null);

            res.write(JSON.stringify({ status, response }));
            res.end();
          }
        });
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
