// const http = require('http');
// const port = 3000;

// // Sample data (in-memory database)
// let users = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Alice' },
// ];

// const server = http.createServer((req, res) => {
//   // Set CORS headers to allow requests from any origin (for demonstration purposes)
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     // Handle preflight requests for CORS
//     res.writeHead(200);
//     res.end();
//     return;
//   }

//   // Parse request URL
//   const urlParts = req.url.split('/');
//   const resource = urlParts[1];
//   const resourceId = parseInt(urlParts[2]);

//   if (resource === 'users') {
//     if (req.method === 'GET') {
//       // Read (GET)
//       if (resourceId) {
//         const user = users.find((u) => u.id === resourceId);
//         if (user) {
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify(user));
//         } else {
//           res.writeHead(404, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'User not found' }));
//         }
//       } else {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(users));
//       }
//     } else if (req.method === 'POST') {
//       // Create (POST)
//       let requestBody = '';
//       req.on('data', (chunk) => {
//         requestBody += chunk.toString();
//       });

//       req.on('end', () => {
//         const newUser = JSON.parse(requestBody);
//         users.push(newUser);
//         res.writeHead(201, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(newUser));
//       });
//     } else if (req.method === 'PUT') {
//       // Update (PUT)
//       if (resourceId) {
//         let requestBody = '';
//         req.on('data', (chunk) => {
//           requestBody += chunk.toString();
//         });

//         req.on('end', () => {
//           const updatedUser = JSON.parse(requestBody);
//           const index = users.findIndex((u) => u.id === resourceId);
//           if (index !== -1) {
//             users[index] = { ...users[index], ...updatedUser };
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(users[index]));
//           } else {
//             res.writeHead(404, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'User not found' }));
//           }
//         });
//       } else {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Invalid request' }));
//       }
//     } else if (req.method === 'DELETE') {
//       // Delete (DELETE)
//       if (resourceId) {
//         const index = users.findIndex((u) => u.id === resourceId);
//         if (index !== -1) {
//           users.splice(index, 1);
//           res.writeHead(200, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'User deleted' }));
//         } else {
//           res.writeHead(404, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ message: 'User not found' }));
//         }
//       } else {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Invalid request' }));
//       }
//     } else {
//       res.writeHead(405, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Method not allowed' }));
//     }
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Resource not found' }));
//   }
// });

// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
