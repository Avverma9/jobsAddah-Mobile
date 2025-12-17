const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let activeUsers = 0;

wss.on("connection", (ws) => {
  activeUsers++;

  // Send the updated active user count to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ activeUsers }));
    }
  });

  ws.on("close", () => {
    activeUsers--;

    // Send the updated active user count to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ activeUsers }));
      }
    });
  });
});

console.log("WebSocket server listening on port 8080...");
