import http from "http";
import axios from "axios";
import path from "path";
import fs from "fs";

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/getGithubUserDetails") {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", async () => {
      try {
        const requestData = JSON.parse(requestBody);

        if (!requestData || !requestData.username) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid request data" }));
          return;
        }

        const { username } = requestData;

        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );

        if (response.status === 200) {
          const userDetails = response.data;
          // Download and save the user's avatar
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

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(userDetails));
        } else {
          res.writeHead(response.status, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ error: "Failed to fetch user details" }));
        }
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Assignment:
// 1. Consume the api: https://fakestoreapi.com/products using axios.

// Save all the product images in a folder with their name as filenames.
