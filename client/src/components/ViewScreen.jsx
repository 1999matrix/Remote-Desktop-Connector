import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const ViewScreen = () => {
  const socketRef = useRef();
  const imageRef = useRef();
  const [selectedHost, setSelectedHost] = useState(null);
  const [isControlling, setIsControlling] = useState(false);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('remote-stream-started', (stream) => {
      if (imageRef.current) {
        const uint8Array = new Uint8Array(stream);
        const blob = new Blob([uint8Array], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        imageRef.current.src = url;
        setIsControlling(true);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleMouseEvent = (e) => {
    if (!isControlling) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (imageRef.current.naturalWidth / rect.width);
    const y = (e.clientY - rect.top) * (imageRef.current.naturalHeight / rect.height);

    socketRef.current.emit('mouse-control', {
      x,
      y,
      action: e.type === 'click' ? 'click' : 'move'
    });
  };

  const handleKeyPress = (e) => {
    if (!isControlling) return;

    socketRef.current.emit('keyboard-input', {
      text: e.key
    });
  };

  return (
    <div>
      <h2>Remote Host Control Panel</h2>
      <div 
        className="screen-view"
        onMouseMove={handleMouseEvent}
        onClick={handleMouseEvent}
        onKeyDown={handleKeyPress}
        tabIndex="0"
      >
        <img 
          ref={imageRef} 
          alt="Remote Screen" 
          style={{ maxWidth: '100%', height: 'auto', cursor: isControlling ? 'crosshair' : 'default' }}
        />
      </div>
      <div className="control-panel">
        <h3>Control Status: {isControlling ? 'Active' : 'Inactive'}</h3>
      </div>
    </div>
  );
};

export default ViewScreen;
