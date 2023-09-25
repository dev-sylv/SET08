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

    if (method === "POST" && url === "/getgithubuserdetails") {
      let requestBody = "";

      req.on("data", (chunk) => {
        requestBody += chunk;
      });
      req.on("end", async () => {
        let requestData = JSON.parse(requestBody);

        const { username } = requestData;

        if (!username || !requestData) {
          status = 400;

          (response.message = "No request Data"),
            (response.sucess = false),
            (response.data = null);

          res.write(JSON.stringify({ status, response }));
          res.end();
        }

        const githubendpoint = await axios.get(
          `https://api.github.com/users/${username}`
        );

        if (githubendpoint.status) {
          const userdetails = githubendpoint.data;

          const useravatar = userdetails.avatar_url;
          const avatarfilename = `${username}_avatar.jpg`;
          const avatarfolder = path.join(
            __dirname,
            "Github_Avatars",
            avatarfilename
          );

          const getavatarurl = await axios.get(useravatar, {
            responseType: "stream",
          });

          getavatarurl.data.pipe(fs.createWriteStream(avatarfolder));

          status = 200;

          (response.message = `${
            userdetails?.name ? userdetails?.name : username
          } Github Details gotten`),
            (response.sucess = true),
            (response.data = userdetails);

          res.write(JSON.stringify({ status, response }));
          res.end();
        } else {
          status = 404;

          (response.message = "User not found"),
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
  }
);

Server.listen(Port, () => {
  console.log("Server is running on port", Port);
});
