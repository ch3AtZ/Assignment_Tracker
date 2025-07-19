import React, { useEffect, useState } from 'react';

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('/assignments')
      .then(res => res.json())
      .then(setAssignments)
      .catch(() => setError('Failed to load assignments'));
  }, []);

  return (
    <div className="app-container modern-form" style={{ background: '#f1f8e9' }}>
      <h2>Assignments</h2>
      {error && <div className="error">{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {assignments.map(a => (
          <li key={a.id} style={{ marginBottom: 24, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #c8e6c9' }}>
            <strong>{a.title}</strong>: {a.description}
            {a.file_path && (
              <a href={`/assignments/${a.id}/download`} style={{ marginLeft: 16, color: '#388e3c', fontWeight: 500 }} target="_blank" rel="noopener noreferrer">Download PDF</a>
            )}
            <a href={`/student/submit/${a.id}`} style={{ marginLeft: 16, color: '#1976d2', fontWeight: 500 }}>Submit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard; 