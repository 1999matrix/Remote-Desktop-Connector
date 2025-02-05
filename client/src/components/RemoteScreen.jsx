import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Change this to your server's IP

const RemoteScreen = () => {
  const [screenData, setScreenData] = useState("");

  useEffect(() => {
    socket.on("screen-update", (data) => {
      setScreenData(`data:image/png;base64,${data}`);
    });

    return () => socket.off("screen-update");
  }, []);

  const sendMouseClick = () => {
    socket.emit("control", { hostId: "remote-host-1", action: "click-mouse" });
  };

  const sendKeyboardInput = () => {
    const text = prompt("Enter text to type remotely:");
    if (text) {
      socket.emit("control", { hostId: "remote-host-1", action: "type-text", payload: text });
    }
  };

  return (
    <div>
      <h2>Remote Screen</h2>
      {screenData && <img src={screenData} alt="Remote Screen" />}
      <button onClick={sendMouseClick}>Click Remote Mouse</button>
      <button onClick={sendKeyboardInput}>Send Keyboard Input</button>
    </div>
  );
};

export default RemoteScreen;
