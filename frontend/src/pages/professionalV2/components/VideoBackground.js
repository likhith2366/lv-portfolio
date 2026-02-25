import React, { useState, useRef } from 'react';
import './VideoBackground.css';

const VideoBackground = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [seaVideoLoaded, setSeaVideoLoaded] = useState(false);
  const seaVideoRef = useRef(null);

  return (
    <div
      className="video-background-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sea video */}
      <video
        ref={seaVideoRef}
        className={`background-video sea-video ${isHovered ? 'transparent' : 'opaque'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setSeaVideoLoaded(true)}
      >
        <source src={`${process.env.PUBLIC_URL}/Assets/Sea.mp4`} type="video/mp4" />
      </video>

      {!seaVideoLoaded && (
        <div className="loading-indicator">
          Loading experience...
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
