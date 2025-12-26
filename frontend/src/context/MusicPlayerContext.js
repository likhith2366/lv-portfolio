import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRACKS } from '../graphql/queries';
import { fadeIn, fadeOut } from '../utils/audioFade';
import { useDebounce } from '../hooks/useDebounce';

const MusicPlayerContext = createContext();

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
}

export function MusicPlayerProvider({ children }) {
  const audioRef = useRef(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // GraphQL query with debounced search
  const { data, loading, error } = useQuery(GET_TRACKS, {
    variables: {
      limit: 100,
      offset: 0,
      search: debouncedSearch || undefined,
    },
    onError: (err) => {
      console.error('❌ GraphQL Query Error:', err);
      console.error('Unable to connect to backend. Is the server running at http://localhost:8080?');
      console.error('Full error:', err);
    },
  });

  // Playback state
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Volume state
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('musicPlayerVolume');
    return saved ? parseFloat(saved) : 0.7;
  });
  const [isMuted, setIsMuted] = useState(false);

  // Modes
  const [shuffle, setShuffle] = useState(() => {
    const saved = localStorage.getItem('musicPlayerShuffle');
    return saved === 'true';
  });
  const [repeat, setRepeat] = useState(() => {
    const saved = localStorage.getItem('musicPlayerRepeat');
    return saved || 'off'; // 'off' | 'all' | 'one'
  });

  // Shuffle order
  const [shuffleOrder, setShuffleOrder] = useState([]);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Update tracks when data loads
  useEffect(() => {
    if (data?.tracks) {
      setTracks(data.tracks);

      // Restore last track
      const lastTrackId = localStorage.getItem('musicPlayerLastTrackId');
      if (lastTrackId) {
        const index = data.tracks.findIndex(t => t.id === lastTrackId);
        if (index !== -1) {
          setCurrentTrackIndex(index);
        }
      }
    }
  }, [data]);

  // Get current track
  const currentTrack = tracks[shuffle && shuffleOrder.length > 0 ? shuffleOrder[currentTrackIndex] : currentTrackIndex];

  // Helper to get audio URL
  const getAudioURL = useCallback((src) => {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    if (src.startsWith('/')) {
      return `${process.env.REACT_APP_API_URL || ''}${src}`;
    }
    return src;
  }, []);

  // Show toast notification
  const showToastNotification = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  }, []);

  // Fisher-Yates shuffle
  const createShuffleOrder = useCallback((tracksArray, currentIndex) => {
    const indices = tracksArray.map((_, i) => i);

    // Remove current track to avoid immediate repeat
    if (currentIndex >= 0 && currentIndex < indices.length) {
      indices.splice(currentIndex, 1);
    }

    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Put current track at the beginning
    if (currentIndex >= 0 && currentIndex < tracksArray.length) {
      indices.unshift(currentIndex);
    }

    return indices;
  }, []);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    const newShuffle = !shuffle;
    setShuffle(newShuffle);
    localStorage.setItem('musicPlayerShuffle', newShuffle.toString());

    if (newShuffle) {
      const order = createShuffleOrder(tracks, currentTrackIndex);
      setShuffleOrder(order);
      showToastNotification('Shuffle: ON');
    } else {
      setShuffleOrder([]);
      showToastNotification('Shuffle: OFF');
    }
  }, [shuffle, tracks, currentTrackIndex, createShuffleOrder, showToastNotification]);

  // Cycle repeat mode
  const cycleRepeat = useCallback(() => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeat(nextMode);
    localStorage.setItem('musicPlayerRepeat', nextMode);

    const labels = { off: 'OFF', all: 'ALL', one: 'ONE' };
    showToastNotification(`Repeat: ${labels[nextMode]}`);
  }, [repeat, showToastNotification]);

  // Play track at index
  const playTrack = useCallback(async (index) => {
    if (!tracks[index] || !audioRef.current) return;

    const actualIndex = shuffle && shuffleOrder.length > 0 ? shuffleOrder[index] : index;
    const track = tracks[actualIndex];

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Load new track
    const audioURL = getAudioURL(track.src);
    audioRef.current.src = audioURL;

    setCurrentTrackIndex(index);
    localStorage.setItem('musicPlayerLastTrackId', track.id);

    // Play with fade in
    try {
      await audioRef.current.play();
      await fadeIn(audioRef.current, 200, volume);
      setIsPlaying(true);
      showToastNotification(`Playing: ${track.title}`);
    } catch (error) {
      console.error('Playback error:', error);
    }
  }, [tracks, shuffle, shuffleOrder, getAudioURL, volume, showToastNotification]);

  // Pause
  const pauseTrack = useCallback(async () => {
    if (!audioRef.current) return;

    await fadeOut(audioRef.current, 200);
    setIsPlaying(false);
  }, []);

  // Resume
  const resumeTrack = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      await fadeIn(audioRef.current, 200, volume);
      setIsPlaying(true);
    } catch (error) {
      console.error('Resume error:', error);
    }
  }, [volume]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else {
      // If no track is loaded yet, play the current track
      if (!audioRef.current?.src || audioRef.current.src === '') {
        playTrack(currentTrackIndex);
      } else {
        resumeTrack();
      }
    }
  }, [isPlaying, pauseTrack, resumeTrack, playTrack, currentTrackIndex]);

  // Next track
  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;

    if (repeat === 'one') {
      // Replay current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    let nextIndex = currentTrackIndex + 1;

    if (nextIndex >= tracks.length) {
      if (repeat === 'all') {
        nextIndex = 0;
      } else {
        // End of playlist
        setIsPlaying(false);
        return;
      }
    }

    playTrack(nextIndex);
  }, [tracks, currentTrackIndex, repeat, playTrack]);

  // Previous track
  const prevTrack = useCallback(() => {
    if (tracks.length === 0) return;

    let prevIndex = currentTrackIndex - 1;

    if (prevIndex < 0) {
      if (repeat === 'all') {
        prevIndex = tracks.length - 1;
      } else {
        prevIndex = 0;
      }
    }

    playTrack(prevIndex);
  }, [tracks, currentTrackIndex, repeat, playTrack]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    localStorage.setItem('musicPlayerVolume', newVolume.toString());
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  }, [isMuted, volume]);

  // Seek to time
  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, repeat, nextTrack]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if input is focused
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if ((e.metaKey || e.ctrlKey) && e.code === 'ArrowRight') {
        e.preventDefault();
        nextTrack();
      } else if ((e.metaKey || e.ctrlKey) && e.code === 'ArrowLeft') {
        e.preventDefault();
        prevTrack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause, nextTrack, prevTrack]);

  const value = {
    // Audio ref
    audioRef,

    // Tracks
    tracks,
    currentTrack,
    currentTrackIndex,
    loading,
    error,

    // Search
    searchQuery,
    setSearchQuery,

    // Playback controls
    isPlaying,
    currentTime,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seekTo,

    // Volume
    volume,
    isMuted,
    handleVolumeChange,
    toggleMute,

    // Modes
    shuffle,
    repeat,
    toggleShuffle,
    cycleRepeat,

    // Toast
    showToast,
    toastMessage,
    showToastNotification,

    // Helpers
    getAudioURL,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </MusicPlayerContext.Provider>
  );
}
