import React, { useEffect, useRef } from 'react';
import { Search, X, Music2 } from 'lucide-react';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import { useDraggable } from '../hooks/useDraggable';
import './PlaylistPanel.css';

function PlaylistPanel({ isVisible }) {
  const {
    tracks,
    currentTrack,
    currentTrackIndex,
    playTrack,
    searchQuery,
    setSearchQuery,
    loading,
  } = useMusicPlayer();

  const listRef = useRef(null);

  // Draggable functionality with different default position
  const { position, isDragging, dragHandlers } = useDraggable('playlistPanelPosition', {
    x: window.innerWidth - 420,
    y: 100,
  });

  // Scroll to current track
  useEffect(() => {
    if (listRef.current && currentTrackIndex >= 0) {
      const currentElement = listRef.current.querySelector('.playlist-item.active');
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentTrackIndex]);

  const handleTrackClick = (index) => {
    playTrack(index);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (!isVisible) return null;

  const panelStyle = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }
    : {};

  return (
    <div
      className={`playlist-panel ${isDragging ? 'dragging' : ''}`}
      style={panelStyle}
    >
      {/* Header - Draggable */}
      <div
        className="playlist-panel-header"
        data-drag-handle
        {...dragHandlers}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Music2 size={18} />
        <span>Playlist</span>
        <span className="track-count">{tracks.length} tracks</span>
      </div>

      {/* Search */}
      <div className="playlist-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search-btn">
              <X size={16} />
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

        {!loading && tracks.length === 0 && (
          <div className="playlist-empty">
            <Music2 size={32} />
            <p>No tracks found</p>
            {searchQuery && <small>Try a different search term</small>}
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
  );
}

export default PlaylistPanel;
