import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Home from './Home';

function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/assignments/${assignmentId}/submissions?username=${user.username}`)
      .then(res => res.json())
      .then(data => setSubmissions(data))
      .catch(() => setError('Failed to load submissions'));
  }, [assignmentId, user.username]);

  return (
    <div>
      <Home />
      <div className="app-container modern-form" style={{ background: '#fce4ec' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: 16, background: '#ad1457', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer' }}>Back</button>
        <h2>Submissions</h2>
        {error && <div className="error">{error}</div>}
        {Array.isArray(submissions) ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {submissions.map(s => (
              <li key={s.id} style={{ marginBottom: 24, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f8bbd0' }}>
                <strong style={{ color: '#ad1457' }}>Student:</strong> {s.student_username}
                <br />
                <strong>Content:</strong> {s.content}
                {s.file_path && (
                  <>
                    <br />
                    <a href={`/submissions/${s.id}/download`} style={{ color: '#6a1b9a', fontWeight: 500 }} target="_blank" rel="noopener noreferrer">Download Submission</a>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="error">
            {submissions && submissions.detail
              ? submissions.detail
              : "No submissions or you are not authorized to view them."}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentSubmissions; 