import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from './Home';

function AssignmentSubmit() {
  const { assignmentId } = useParams();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const data = new FormData();
    data.append('assignment_id', assignmentId);
    data.append('content', content);
    data.append('username', user.username);
    if (file) data.append('file', file);
    try {
      const res = await fetch('/assignments/submit', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Failed to submit assignment');
      setSuccess(true);
      setTimeout(() => navigate('/student'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Home />
      <div className="app-container modern-form" style={{ background: '#fffde7' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: 16, background: '#fbc02d', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }}>Back</button>
        <h2>Submit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your submission..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div>Submission successful!</div>}
      </div>
    </div>
  );
}

export default AssignmentSubmit; 