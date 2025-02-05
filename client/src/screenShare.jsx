import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5173/");

const ScreenShare = ({ sessionId }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    startSharing();
  }, []);

  const startSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current.srcObject = screenStream;
      setStream(screenStream);

      socket.emit("start-session", sessionId);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Screen Sharing</h2>
      <video ref={videoRef} autoPlay className="border rounded w-full h-96" />
      <button 
        onClick={() => stream?.getTracks().forEach(track => track.stop())} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Stop Sharing
      </button>
    </div>
  );
};

export default ScreenShare;
