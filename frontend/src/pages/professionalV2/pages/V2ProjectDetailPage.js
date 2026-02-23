import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MagazineViewer from '../components/MagazineViewer';
import './V2ProjectDetailPage.css';

const V2ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleClose = useCallback(() => {
    navigate('/professional-v2/projects');
  }, [navigate]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  return (
    <div className="v2pd-backdrop" onClick={handleBackdropClick}>
      <span className="v2pd-close-hint">Click outside to go back</span>

      {loading && (
        <div className="v2pd-loading">
          <div className="v2pd-spinner" />
          <span>Loading project...</span>
        </div>
      )}

      {error && (
        <div className="v2pd-error">
          <h2>Project Not Found</h2>
          <p>{error}</p>
          <button className="v2pd-error-btn" onClick={handleClose}>
            Back to Projects
          </button>
        </div>
      )}

      {project && !loading && (
        <div className="v2pd-magazine-wrapper" onClick={(e) => e.stopPropagation()}>
          <MagazineViewer project={project} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default V2ProjectDetailPage;
