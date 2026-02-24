import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useMusicPlayer } from '../../../context/MusicPlayerContext';
import './MusicDeck.css';

const SONGS = [
  {
    title: 'The Only Living Boy In New York',
    artist: 'Simon & Garfunkel',
    cover: '/Assets/songImages/the-only-living-boy-in-new-york.png',
    src: '/Assets/songs/0314._Simon_Garfunkel_-_The_Only_Living_Boy_In_New_York_1970_(mp3.pm).mp3',
  },
  {
    title: 'Cloud 9',
    artist: 'Beach Bunny ft. Tegan and Sara',
    cover: '/Assets/songImages/cloud9.jpeg',
    src: '/Assets/songs/Beach_Bunny_feat._Tegan_and_Sara_-_Cloud_9_feat._Tegan_and_Sara_(mp3.pm).mp3',
  },
  {
    title: 'Across The Universe',
    artist: 'Nirvana (Beatles Cover)',
    cover: '/Assets/songImages/across-the-universe.jpg',
    src: '/Assets/songs/Nirvana_cover_The_Beatles_-_Across_The_Universe_(mp3.pm).mp3',
  },
  {
    title: 'Picture Of You',
    artist: 'The Cure',
    cover: '/Assets/songImages/thecure.jpeg',
    src: '/Assets/songs/The_Cure_-_Picture_Of_You_(mp3.pm).mp3',
  },
  {
    title: 'There Is A Light That Never Goes Out',
    artist: 'The Smiths',
    cover: '/Assets/songImages/the-smiths.jpg',
    src: '/Assets/songs/The_Smiths_-_There_Is_A_Light_That_Never_Goes_Out_LIVE_(mp3.pm).mp3',
  },
  {
    title: "Here's Where The Story Ends",
    artist: 'The Sundays',
    cover: '/Assets/songImages/the-sundays.jpg',
    src: '/Assets/songs/The_Sundays_-_Here_s_Where_The_Story_Ends_(mp3.pm).mp3',
  },
];

const TOTAL = SONGS.length;

/*
  Circular fan: offset wraps around so cards always appear on both sides.
  e.g. with 6 cards, offsets are -2, -1, 0, 1, 2, 3 → wrapped to -3..+3
*/
const getCircularOffset = (index, activeIndex) => {
  let off = index - activeIndex;
  // Wrap to shortest path: range [-TOTAL/2, +TOTAL/2)
  if (off > TOTAL / 2) off -= TOTAL;
  if (off < -TOTAL / 2) off += TOTAL;
  return off;
};

const getFanStyle = (index, activeIndex) => {
  const offset = getCircularOffset(index, activeIndex);
  const absOff = Math.abs(offset);

  return {
    x: offset * 160,
    rotateY: offset * -10,
    scale: 1 - absOff * 0.08,
    z: -absOff * 80,
    zIndex: TOTAL - absOff,
  };
};

const SPRING = { type: 'spring', stiffness: 200, damping: 24 };

const MusicDeck = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playDirectTrack, pauseTrack, isPlaying, currentTrack } = useMusicPlayer();

  const playingSongIndex = SONGS.findIndex(
    (s) => currentTrack?.src === s.src
  );
  const isThisDeckPlaying = isPlaying && playingSongIndex !== -1;

  const handleCardClick = useCallback((index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }
    const song = SONGS[index];
    if (index === playingSongIndex && isPlaying) {
      pauseTrack();
    } else {
      playDirectTrack(song);
    }
  }, [activeIndex, playingSongIndex, isPlaying, pauseTrack, playDirectTrack]);

  return (
    <section className="music-deck-section">
      <h2 className="music-deck-title">
        my <span>favourite</span> tracks
      </h2>

      <div className="music-deck-stage">
        <div className="music-deck-fan">
          {SONGS.map((s, i) => {
            const fan = getFanStyle(i, activeIndex);
            const isCenter = i === activeIndex;

            return (
              <motion.div
                key={i}
                className={`music-deck-card ${isCenter ? 'music-deck-card--active' : ''}`}
                animate={{
                  x: fan.x,
                  rotateY: fan.rotateY,
                  scale: fan.scale,
                  zIndex: fan.zIndex,
                }}
                transition={SPRING}
                whileHover={isCenter ? { scale: 1.08, y: -16 } : { scale: fan.scale + 0.04, y: -8 }}
                whileTap={{ scale: fan.scale - 0.03 }}
                onClick={() => handleCardClick(i)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src={s.cover} alt={s.title} draggable={false} />
                <div className="music-deck-card-overlay" />
                <div className="music-deck-card-info">
                  <p className="music-deck-card-song">{s.title}</p>
                  <p className="music-deck-card-artist">{s.artist}</p>
                </div>

                {/* Play icon / EQ bars */}
                <div className="music-deck-card-play-icon">
                  {i === playingSongIndex && isThisDeckPlaying ? (
                    <div className="music-deck-eq-bars">
                      <div className="music-deck-eq-bar" />
                      <div className="music-deck-eq-bar" />
                      <div className="music-deck-eq-bar" />
                      <div className="music-deck-eq-bar" />
                    </div>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="8,5 20,12 8,19" />
                    </svg>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="music-deck-dots">
        {SONGS.map((_, i) => (
          <button
            key={i}
            className={`music-deck-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Song ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default MusicDeck;
