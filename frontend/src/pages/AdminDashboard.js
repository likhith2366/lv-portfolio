import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Data states
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [research, setResearch] = useState([]);
  const [movies, setMovies] = useState([]);
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [token, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [profileRes, projectsRes, educationRes, researchRes, moviesRes, messagesRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/profile', { headers }),
        fetch('http://localhost:5000/api/projects'),
        fetch('http://localhost:5000/api/admin/education', { headers }),
        fetch('http://localhost:5000/api/admin/research', { headers }),
        fetch('http://localhost:5000/api/admin/movies', { headers }),
        fetch('http://localhost:5000/api/admin/messages', { headers })
      ]);

      setProfile(await profileRes.json());
      setProjects(await projectsRes.json());
      setEducation(await educationRes.json());
      setResearch(await researchRes.json());
      setMovies(await moviesRes.json());
      setMessages(await messagesRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.message.includes('401')) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      setProfile(data);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error saving profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-nav-brand">
          <h1>Admin Dashboard</h1>
          <span className="username">👤 {localStorage.getItem('adminUsername')}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="admin-content">
        <div className="admin-sidebar">
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            💼 Projects ({projects.length})
          </button>
          <button
            className={activeTab === 'education' ? 'active' : ''}
            onClick={() => setActiveTab('education')}
          >
            🎓 Education ({education.length})
          </button>
          <button
            className={activeTab === 'research' ? 'active' : ''}
            onClick={() => setActiveTab('research')}
          >
            🔬 Research ({research.length})
          </button>
          <button
            className={activeTab === 'movies' ? 'active' : ''}
            onClick={() => setActiveTab('movies')}
          >
            🎬 Movies ({movies.length})
          </button>
          <button
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            📧 Messages ({messages.filter(m => !m.read).length})
          </button>
        </div>

        <div className="admin-main">
          {activeTab === 'profile' && (
            <ProfileEditor
              profile={profile}
              setProfile={setProfile}
              saving={saving}
              onSave={saveProfile}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager projects={projects} setProjects={setProjects} token={token} />
          )}

          {activeTab === 'education' && (
            <EducationManager education={education} setEducation={setEducation} token={token} />
          )}

          {activeTab === 'research' && (
            <ResearchManager research={research} setResearch={setResearch} token={token} />
          )}

          {activeTab === 'movies' && (
            <MoviesManager movies={movies} setMovies={setMovies} token={token} />
          )}

          {activeTab === 'messages' && (
            <MessagesManager messages={messages} setMessages={setMessages} token={token} />
          )}
        </div>
      </div>
    </div>
  );
}

// Profile Editor Component
function ProfileEditor({ profile, setProfile, saving, onSave }) {
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="editor-section">
      <div className="section-header">
        <h2>Profile Information</h2>
        <button onClick={onSave} className="save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={profile.name || ''}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <input
            type="text"
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={profile.location || ''}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="text"
            value={profile.linkedin || ''}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>GitHub</label>
          <input
            type="text"
            value={profile.github || ''}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input
            type="text"
            value={profile.instagram || ''}
            onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>About</label>
        <textarea
          rows="6"
          value={profile.about || ''}
          onChange={(e) => setProfile({ ...profile, about: e.target.value })}
        />
      </div>
    </div>
  );
}

// Projects Manager Component
function ProjectsManager({ projects, setProjects, token }) {
  const [editingProject, setEditingProject] = useState(null);

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;

    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={() => setEditingProject({})} className="add-btn">+ Add Project</button>
      </div>

      <div className="items-list">
        {projects.map(project => (
          <div key={project._id} className="item-card">
            <div className="item-header">
              <h3>{project.title}</h3>
              <div className="item-actions">
                <button onClick={() => setEditingProject(project)} className="edit-btn-small">Edit</button>
                <button onClick={() => deleteProject(project._id)} className="delete-btn-small">Delete</button>
              </div>
            </div>
            <p className="item-subtitle">{project.subtitle}</p>
            <div className="item-meta">
              <span>{project.role}</span>
              <span>{project.techStack?.length || 0} technologies</span>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          setEditingProject={setEditingProject}
          setProjects={setProjects}
          projects={projects}
          token={token}
        />
      )}
    </div>
  );
}

// Project Edit Modal
function ProjectEditModal({ project, setEditingProject, setProjects, projects, token }) {
  const [formData, setFormData] = useState(project);

  const handleSave = async () => {
    try {
      const url = formData._id
        ? `http://localhost:5000/api/projects/${formData._id}`
        : 'http://localhost:5000/api/projects';

      const response = await fetch(url, {
        method: formData._id ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const savedProject = await response.json();

      if (formData._id) {
        setProjects(projects.map(p => p._id === savedProject._id ? savedProject : p));
      } else {
        setProjects([...projects, savedProject]);
      }

      setEditingProject(null);
    } catch (error) {
      alert('Error saving project');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setEditingProject(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData._id ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={() => setEditingProject(null)} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea
              value={formData.detailedDescription || ''}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              rows="6"
            />
          </div>

          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input
              type="text"
              value={formData.techStack?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>

          <div className="form-group">
            <label>GitHub Link</label>
            <input
              type="url"
              value={formData.github || ''}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Live URL</label>
            <input
              type="url"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setEditingProject(null)} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

// Education Manager Component
function EducationManager({ education, setEducation, token }) {
  const [editingEducation, setEditingEducation] = useState(null);

  const deleteEducation = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;

    try {
      await fetch(`http://localhost:5000/api/admin/education/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEducation(education.filter(e => e._id !== id));
    } catch (error) {
      alert('Error deleting education');
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Education</h2>
        <button onClick={() => setEditingEducation({})} className="add-btn">+ Add Education</button>
      </div>
      <div className="items-list">
        {education.map(edu => (
          <div key={edu._id} className="item-card">
            <div className="item-header">
              <h3>{edu.degree} in {edu.field}</h3>
              <div className="item-actions">
                <button onClick={() => setEditingEducation(edu)} className="edit-btn-small">Edit</button>
                <button onClick={() => deleteEducation(edu._id)} className="delete-btn-small">Delete</button>
              </div>
            </div>
            <p className="item-subtitle">{edu.school} • GPA: {edu.gpa}</p>
            <div className="item-meta">
              <span>{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>

      {editingEducation && (
        <EducationEditModal
          education={editingEducation}
          setEditingEducation={setEditingEducation}
          setEducation={setEducation}
          educationList={education}
          token={token}
        />
      )}
    </div>
  );
}

// Education Edit Modal
function EducationEditModal({ education, setEditingEducation, setEducation, educationList, token }) {
  const [formData, setFormData] = useState(education);

  const handleSave = async () => {
    try {
      const url = formData._id
        ? `http://localhost:5000/api/admin/education/${formData._id}`
        : 'http://localhost:5000/api/admin/education';

      const response = await fetch(url, {
        method: formData._id ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const savedEducation = await response.json();

      if (formData._id) {
        setEducation(educationList.map(e => e._id === savedEducation._id ? savedEducation : e));
      } else {
        setEducation([...educationList, savedEducation]);
      }

      setEditingEducation(null);
    } catch (error) {
      alert('Error saving education');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setEditingEducation(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData._id ? 'Edit Education' : 'Add Education'}</h2>
          <button onClick={() => setEditingEducation(null)} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={formData.degree || ''}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              value={formData.field || ''}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>School</label>
            <input
              type="text"
              value={formData.school || ''}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>GPA</label>
            <input
              type="text"
              value={formData.gpa || ''}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="text"
              value={formData.startDate || ''}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="e.g., Sep 2020"
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="text"
              value={formData.endDate || ''}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              placeholder="e.g., May 2024"
            />
          </div>

          <div className="form-group">
            <label>Relevant Courses (comma separated)</label>
            <input
              type="text"
              value={formData.courses?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, courses: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>

          <div className="form-group">
            <label>Achievements (comma separated)</label>
            <input
              type="text"
              value={formData.achievements?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setEditingEducation(null)} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

// Research Manager Component
function ResearchManager({ research, setResearch, token }) {
  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Research & Publications</h2>
        <button className="add-btn">+ Add Research</button>
      </div>
      <div className="items-list">
        {research.length === 0 ? (
          <p className="empty-state">No research publications yet. Add your first one!</p>
        ) : (
          research.map(r => (
            <div key={r._id} className="item-card">
              <h3>{r.title}</h3>
              <p>{r.authors?.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Movies Manager Component
function MoviesManager({ movies, setMovies, token }) {
  const [editingMovie, setEditingMovie] = useState(null);

  const deleteMovie = async (id) => {
    if (!window.confirm('Delete this movie?')) return;

    try {
      await fetch(`http://localhost:5000/api/admin/movies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMovies(movies.filter(m => m._id !== id));
    } catch (error) {
      alert('Error deleting movie');
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Movies</h2>
        <button onClick={() => setEditingMovie({})} className="add-btn">+ Add Movie</button>
      </div>

      <div className="items-list">
        {movies.map(movie => (
          <div key={movie._id} className="item-card">
            <div className="item-header">
              <h3>{movie.title} {movie.watched && '✓'}</h3>
              <div className="item-actions">
                <button onClick={() => setEditingMovie(movie)} className="edit-btn-small">Edit</button>
                <button onClick={() => deleteMovie(movie._id)} className="delete-btn-small">Delete</button>
              </div>
            </div>
            <div className="item-meta">
              <span>IMDB: {movie.imdbRating}/10</span>
              {movie.posterUrl && <span>Has poster</span>}
            </div>
          </div>
        ))}
        {movies.length === 0 && (
          <p className="empty-state">No movies yet. Add your first one!</p>
        )}
      </div>

      {editingMovie && (
        <MovieEditModal
          movie={editingMovie}
          setEditingMovie={setEditingMovie}
          setMovies={setMovies}
          movies={movies}
          token={token}
        />
      )}
    </div>
  );
}

// Movie Edit Modal
function MovieEditModal({ movie, setEditingMovie, setMovies, movies, token }) {
  const [formData, setFormData] = useState(movie);

  const handleSave = async () => {
    try {
      const url = formData._id
        ? `http://localhost:5000/api/admin/movies/${formData._id}`
        : 'http://localhost:5000/api/admin/movies';

      const response = await fetch(url, {
        method: formData._id ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const savedMovie = await response.json();

      if (formData._id) {
        setMovies(movies.map(m => m._id === savedMovie._id ? savedMovie : m));
      } else {
        setMovies([...movies, savedMovie]);
      }

      setEditingMovie(null);
    } catch (error) {
      alert('Error saving movie');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setEditingMovie(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData._id ? 'Edit Movie' : 'Add Movie'}</h2>
          <button onClick={() => setEditingMovie(null)} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>IMDB Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.imdbRating || 7.5}
              onChange={(e) => setFormData({ ...formData, imdbRating: parseFloat(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Poster URL</label>
            <input
              type="url"
              value={formData.posterUrl || ''}
              onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.watched || false}
                onChange={(e) => setFormData({ ...formData, watched: e.target.checked })}
              />
              Watched
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setEditingMovie(null)} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

// Messages Manager Component
function MessagesManager({ messages, setMessages, token }) {
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (error) {
      alert('Error marking message as read');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;

    try {
      await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m._id !== id));
    } catch (error) {
      alert('Error deleting message');
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Contact Messages</h2>
        <span>{messages.filter(m => !m.read).length} unread</span>
      </div>

      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg._id} className={`message-card ${msg.read ? 'read' : 'unread'}`}>
            <div className="message-header">
              <div>
                <strong>{msg.name}</strong>
                <span className="message-email">{msg.email}</span>
              </div>
              <div className="message-actions">
                {!msg.read && (
                  <button onClick={() => markAsRead(msg._id)} className="mark-read-btn">
                    Mark Read
                  </button>
                )}
                <button onClick={() => deleteMessage(msg._id)} className="delete-btn-small">
                  Delete
                </button>
              </div>
            </div>
            <h4>{msg.subject}</h4>
            <p>{msg.message}</p>
            <div className="message-meta">
              {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="empty-state">No messages yet</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
