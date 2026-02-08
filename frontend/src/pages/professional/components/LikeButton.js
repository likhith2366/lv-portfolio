import React, { useState, useEffect } from 'react';
import './LikeButton.css';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if user has already liked
    const hasLiked = localStorage.getItem('portfolio_liked');
    const likeCount = localStorage.getItem('portfolio_like_count');

    if (hasLiked === 'true') {
      setIsVisible(false);
    }

    if (likeCount) {
      setCount(parseInt(likeCount));
    } else {
      // Initialize with a random count between 50-100
      const initialCount = Math.floor(Math.random() * 51) + 50;
      setCount(initialCount);
      localStorage.setItem('portfolio_like_count', initialCount.toString());
    }
  }, []);

  const handleLike = () => {
    setLiked(true);

    // Increment count
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('portfolio_like_count', newCount.toString());
    localStorage.setItem('portfolio_liked', 'true');

    // Animate out after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`like-button-container ${liked ? 'liked' : ''}`}>
      <div className="like-card">
        <div className="like-content">
          <div className="like-text">
            <span className="like-emoji">✨</span>
            <p>If you like this portfolio, give it a like!</p>
          </div>

          <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={liked}
          >
            <span className="like-icon">
              {liked ? '❤️' : '🤍'}
            </span>
            <span className="like-count">{count}</span>
            <div className="like-particles">
              {liked && [...Array(8)].map((_, i) => (
                <div key={i} className="particle" style={{ '--i': i }}></div>
              ))}
            </div>
          </button>
        </div>

        {liked && (
          <div className="thank-you-message">
            <span className="thank-you-icon">🎉</span>
            Thank you for the love!
          </div>
        )}
      </div>
    </div>
  );
}

export default LikeButton;
