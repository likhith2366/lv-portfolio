import { useState, useEffect } from 'react';
import './LikeButtonMinimal.css';

function LikeButtonMinimal() {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasLiked = localStorage.getItem('portfolio_liked');
    if (hasLiked === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleLike = () => {
    setLiked(true);
    localStorage.setItem('portfolio_liked', 'true');

    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`like-minimal ${liked ? 'liked' : ''}`}>
      <button
        className="like-btn-minimal"
        onClick={handleLike}
        disabled={liked}
      >
        <span className="like-icon-minimal">{liked ? '❤️' : '🤍'}</span>
        {!liked && <span className="like-text-minimal">Like this?</span>}
        {liked && <span className="like-text-minimal">Thanks!</span>}
      </button>
    </div>
  );
}

export default LikeButtonMinimal;
