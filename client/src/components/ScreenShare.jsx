import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ScreenShare = () => {
  const socketRef = useRef();
  const streamRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    const startSharing = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        streamRef.current = stream;
        
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        // Capture and send frames every 100ms
        setInterval(async () => {
          const frame = await imageCapture.grabFrame();
          const canvas = document.createElement('canvas');
          canvas.width = frame.width;
          canvas.height = frame.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(frame, 0, 0);
          
          const imageData = canvas.toDataURL('image/jpeg', 0.5);
          socketRef.current.emit('screen-data', imageData);
        }, 100);

      } catch (error) {
        console.error('Error sharing screen:', error);
      }
    };

    startSharing();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Sharing Screen</h2>
      <p>Your screen is being shared...</p>
    </div>
  );
};

export default ScreenShare;
