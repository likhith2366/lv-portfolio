import React, { useState, useEffect } from 'react';

const DEFAULT_POSTER = 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Poster';
const API_URL = process.env.REACT_APP_API_URL || '/api';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // all, watched, unwatched
  const [sortBy, setSortBy] = useState('rating'); // rating, title
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/movies`);
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter and sort movies
  const filteredMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (filterTab === 'watched') return matchesSearch && movie.watched;
      if (filterTab === 'unwatched') return matchesSearch && !movie.watched;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.imdbRating - a.imdbRating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleMovieClick = (title) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}+imdb`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Search and Filters */}
        <div style={{ marginBottom: '30px' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '12px 20px',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </div>

          {/* Filter Tabs and Sort */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['all', 'watched', 'unwatched'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  style={{
                    padding: '8px 20px',
                    background: filterTab === tab ? '#6366f1' : '#1a1a1a',
                    border: '1px solid',
                    borderColor: filterTab === tab ? '#6366f1' : '#333',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 16px',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <div style={{ fontSize: '18px' }}>Loading movies...</div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#e50914' }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>❌ Error loading movies</div>
            <div style={{ fontSize: '14px', color: '#666' }}>{error}</div>
            <div style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>Make sure the backend server is running on port 5000</div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <div style={{ fontSize: '18px' }}>No movies found</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px',
            paddingBottom: '40px',
          }}>
            {filteredMovies.map(movie => (
              <div
                key={movie._id}
                onClick={() => handleMovieClick(movie.title)}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '1px solid #222',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.borderColor = '#6366f1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#222';
                }}
              >
                {/* Poster */}
                <div style={{ position: 'relative', paddingTop: '150%', background: '#111' }}>
                  <img
                    src={movie.posterUrl || DEFAULT_POSTER}
                    alt={movie.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Watched Indicator */}
                  {movie.watched && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(34, 197, 94, 0.9)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}>
                      ✓
                    </div>
                  )}
                  {/* Rating Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <span style={{ color: '#fbbf24', fontSize: '14px' }}>⭐</span>
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
                      {movie.imdbRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Movie Info */}
                <div style={{ padding: '16px' }}>
                  <div style={{
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {movie.title}
                  </div>
                  <div style={{
                    color: '#888',
                    fontSize: '13px',
                  }}>
                    {movie.watched ? 'Watched' : 'Not watched'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
