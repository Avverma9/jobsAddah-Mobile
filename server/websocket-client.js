const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:5000");

ws.on("message", (data) => {
  const message = JSON.parse(data);
  console.log("Active users:", message.activeUsers);
  
});

ws.on("open", () => {
  console.log("Connected to WebSocket server");
});

ws.on("close", () => {
  console.log("Disconnected from WebSocket server");
});
