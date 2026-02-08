import React, { useState, useRef } from 'react';
import './VideoBackground.css';

const VideoBackground = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [seaVideoLoaded, setSeaVideoLoaded] = useState(false);
  const [sunsetVideoLoaded, setSunsetVideoLoaded] = useState(false);
  const seaVideoRef = useRef(null);
  const sunsetVideoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="video-background-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sunset video - background layer (always visible underneath) */}
      <video
        ref={sunsetVideoRef}
        className="background-video sunset-video visible"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => {
          console.log('Sunset video loaded successfully');
          setSunsetVideoLoaded(true);
        }}
        onError={(e) => console.log('Sunset video error:', e)}
        onCanPlay={() => console.log('Sunset video can play')}
      >
        <source src={`${process.env.PUBLIC_URL}/Assets/sunset_1920.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sea video - foreground layer (transparent overlay) */}
      <video
        ref={seaVideoRef}
        className={`background-video sea-video ${isHovered ? 'transparent' : 'opaque'}`}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => {
          console.log('Sea video loaded successfully');
          setSeaVideoLoaded(true);
        }}
        onError={(e) => console.log('Sea video error:', e)}
        onCanPlay={() => console.log('Sea video can play')}
      >
        <source src={`${process.env.PUBLIC_URL}/Assets/Sea.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading indicator */}
      {(!seaVideoLoaded || !sunsetVideoLoaded) && (
        <div className="loading-indicator">
          Loading experience...
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
