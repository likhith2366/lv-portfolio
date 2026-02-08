import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Repeat,
  Repeat1,
  Shuffle,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Minimize2,
} from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useDraggable } from '../hooks/useDraggable';
import './MusicPlayer.css';

function MusicPlayer() {
  const location = useLocation();
  const listRef = useRef(null);

  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seekTo,
    volume,
    isMuted,
    handleVolumeChange,
    toggleMute,
    shuffle,
    repeat,
    toggleShuffle,
    cycleRepeat,
    showToast,
    toastMessage,
    tracks,
    loading,
    error,
    playTrack,
    searchQuery,
    setSearchQuery,
  } = useMusicPlayer();

  // Local state for playlist visibility
  const [showPlaylist, setShowPlaylist] = useState(() => {
    const saved = localStorage.getItem('playlistVisible');
    return saved === 'true';
  });

  // Local state for minimized mode
  const [isMinimized, setIsMinimized] = useState(() => {
    const saved = localStorage.getItem('musicPlayerMinimized');
    return saved === 'true';
  });

  // Draggable functionality
  const { position, isDragging, hasDragged, dragHandlers } = useDraggable('musicPlayerPosition', null);

  // Only show on /profiles page and future pages (not on /, /terminal, /welcome)
  const hiddenPaths = ['/', '/terminal', '/welcome'];
  const shouldShow = !hiddenPaths.includes(location.pathname);

  // Scroll to current track when it changes
  useEffect(() => {
    if (showPlaylist && listRef.current && currentTrackIndex >= 0) {
      const currentElement = listRef.current.querySelector('.playlist-item.active');
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentTrackIndex, showPlaylist]);

  // Format time display
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    seekTo(newTime);
  };

  // Handle volume slider change
  const onVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    handleVolumeChange(newVolume);
  };

  // Toggle playlist visibility
  const handleTogglePlaylist = () => {
    const newValue = !showPlaylist;
    setShowPlaylist(newValue);
    localStorage.setItem('playlistVisible', newValue.toString());
  };

  // Toggle minimized mode
  const handleToggleMinimize = () => {
    const newValue = !isMinimized;
    setIsMinimized(newValue);
    localStorage.setItem('musicPlayerMinimized', newValue.toString());
    // Close playlist when minimizing
    if (newValue) {
      setShowPlaylist(false);
      localStorage.setItem('playlistVisible', 'false');
    }
  };

  // Handle track click
  const handleTrackClick = (index) => {
    playTrack(index);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Progress percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Get repeat icon
  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat;

  // Determine if buttons should be disabled
  const canGoPrev = tracks.length > 0;
  const canGoNext = tracks.length > 0;

  const playerStyle = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'none',
      }
    : {};

  if (!shouldShow) return null;

  // Handle click on minimized player (only if not dragging)
  const handleMinimizedClick = (e) => {
    // Only expand if we didn't just drag
    if (!hasDragged) {
      handleToggleMinimize();
    }
  };

  // Minimized floating circle view
  if (isMinimized) {
    return (
      <div
        className={`music-player-minimized ${isDragging ? 'dragging' : ''}`}
        style={position ? {
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
        } : {}}
        data-drag-handle
        {...dragHandlers}
        onClick={handleMinimizedClick}
        title="Click to expand music player"
      >
        <Music size={24} className="minimized-icon" />
        {isPlaying && (
          <div className="playing-indicator">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`music-player ${isDragging ? 'dragging' : ''} ${position ? 'positioned' : ''} ${showPlaylist ? 'expanded' : ''}`}
      style={playerStyle}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="music-player-toast">
          {toastMessage}
        </div>
      )}

      {/* Header - Draggable */}
      <div
        className="music-player-header"
        data-drag-handle
        {...dragHandlers}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Music size={20} className="music-icon" />
        <span className="now-playing">Now playing</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className="minimize-btn"
            onClick={handleToggleMinimize}
            title="Minimize player"
          >
            <Minimize2 size={14} />
          </button>
          <button
            className={`playlist-toggle-btn ${showPlaylist ? 'active' : ''}`}
            onClick={handleTogglePlaylist}
            title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
          >
            {showPlaylist ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Cover Image */}
      {currentTrack?.cover && (
        <div className="music-player-cover">
          <img src={currentTrack.cover} alt="Album cover" />
        </div>
      )}

      {/* Song Info */}
      <div className="music-player-info">
        <div className="song-title">{currentTrack?.title || 'No track selected'}</div>
        <div className="song-artist">{currentTrack?.artist || '---'}</div>
      </div>

      {/* Progress Bar */}
      <div className="music-player-progress">
        <div className="progress-bar" onClick={handleProgressClick}>
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="music-player-controls">
        <button
          className={`control-btn ${!canGoPrev ? 'disabled' : ''}`}
          onClick={prevTrack}
          disabled={!canGoPrev}
          title="Previous track"
        >
          <SkipBack size={16} />
        </button>

        <button
          className="control-btn play-pause"
          onClick={togglePlayPause}
          disabled={!currentTrack}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          className={`control-btn ${!canGoNext ? 'disabled' : ''}`}
          onClick={nextTrack}
          disabled={!canGoNext}
          title="Next track"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume & Modes */}
      <div className="music-player-footer">
        <div className="volume-control">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={onVolumeChange}
            className="volume-slider"
          />
        </div>

        <div className="mode-controls">
          <button
            className={`mode-btn ${shuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title={`Shuffle: ${shuffle ? 'ON' : 'OFF'}`}
          >
            <Shuffle size={14} />
          </button>
          <button
            className={`mode-btn ${repeat !== 'off' ? 'active' : ''}`}
            onClick={cycleRepeat}
            title={`Repeat: ${repeat.toUpperCase()}`}
          >
            <RepeatIcon size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Playlist */}
      {showPlaylist && (
        <div className="music-player-playlist">
          {/* Search */}
          <div className="playlist-search">
            <div className="search-input-wrapper">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="clear-search-btn">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Track List */}
          <div className="playlist-tracks" ref={listRef}>
            {loading && (
              <div className="playlist-loading">
                <div className="loading-spinner"></div>
                <span>Loading tracks...</span>
              </div>
            )}

            {error && !loading && (
              <div className="playlist-empty playlist-error">
                <X size={24} />
                <p>Unable to load playlist</p>
                <small>Check your connection and try again</small>
              </div>
            )}

            {!loading && !error && tracks.length === 0 && (
              <div className="playlist-empty">
                <Music size={24} />
                <p>No tracks found</p>
                {searchQuery && <small>Try a different search</small>}
              </div>
            )}

            {!loading && tracks.map((track, index) => (
              <div
                key={track.id}
                className={`playlist-item ${index === currentTrackIndex && currentTrack?.id === track.id ? 'active' : ''}`}
                onClick={() => handleTrackClick(index)}
              >
                <div className="playlist-item-info">
                  <div className="playlist-item-title">{track.title}</div>
                  <div className="playlist-item-artist">{track.artist}</div>
                </div>
                {track.durationSeconds && (
                  <div className="playlist-item-duration">
                    {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
