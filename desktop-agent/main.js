const io = require("socket.io-client");
const screenshot = require("screenshot-desktop");
const { mouse, keyboard } = require("@nut-tree-fork/nut-js");

const SERVER_URL = "http://localhost:3001"; // Change this to your server's IP
const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Connected to control server");

  // Periodically send screenshots
  setInterval(async () => {
    try {
      const imgBuffer = await screenshot({ format: "png" });
      socket.emit("screen-data", imgBuffer.toString("base64"));
    } catch (err) {
      console.error("Screenshot error:", err);
    }
  }, 1000); // Send every second

  // Mouse movement
  socket.on("move-mouse", async ({ x, y }) => {
    await mouse.move([new mouse.Point(x, y)]);
  });

  // Mouse click
  socket.on("click-mouse", async () => {
    await mouse.click();
  });

  // Keyboard typing
  socket.on("type-text", async (text) => {
    await keyboard.type(text);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from control server");
  });
});
