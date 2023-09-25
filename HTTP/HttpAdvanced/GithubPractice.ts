import http, { IncomingMessage, ServerResponse } from "http";
import axios from "axios";
import path from "path";
import fs from "fs";

const port = 3400;

interface Data {
  message: string;
  success: boolean;
  data: null | {} | {}[];
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-Type", "application/json");

    const { method, url } = req;

    let Status: number = 404;

    let response: Data = {
      message: "Failed",
      success: false,
      data: null,
    };

    if (method === "POST" && url === "/getgithubuserdetails") {
      let requestBody = "";

      req.on("data", (chunk) => {
        requestBody += chunk;
      });

      req.on("end", async () => {
        try {
          const requestData = JSON.parse(requestBody);

          const { username } = requestData;

          if (!requestData || !username) {
            Status = 400;
            response.message = "Invalid request Data";
            response.success = false;
            response.data = null;
            res.write(JSON.stringify({ response, Status }));

            res.end();
          }

          const githubendpoint = await axios.get(
            `https://api.github.com/users/${username}`
          );

          if (githubendpoint.status) {
            const userDetails = githubendpoint.data;

            const avatarUrl = userDetails.avatar_url;
            const avatarFileName = `${username}_avatar.jpg`;
            const avatarFilePath = path.join(
              __dirname,
              "Avatars",
              avatarFileName
            );

            const avatarResponse = await axios.get(avatarUrl, {
              responseType: "stream",
            });
            avatarResponse.data.pipe(fs.createWriteStream(avatarFilePath));

            Status = 200;
            response.message = `${userDetails.name} Github Details Gotten Successfully`;
            response.success = true;
            response.data = userDetails;
            res.write(JSON.stringify({ response, Status }));

            res.end();
          } else {
            Status = 400;
            response.message = "Failed to fetch users details";
            response.success = false;
            response.data = null;
            res.write(JSON.stringify({ response, Status }));

            res.end();
          }
        } catch (error) {
          Status = 500;
          response.message = "Internal Server Response";
          response.success = false;
          response.data = null;
          res.write(JSON.stringify({ response, Status }));

          res.end();
        }
      });
    } else {
      Status = 400;
      response.message = "Bad Request";
      response.success = false;
      response.data = null;
      res.write(JSON.stringify({ response, Status }));

      res.end();
    }
  }
);

server.listen(port, () => {
  console.log("");
  console.log("Server is running on port", port);
});
