import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
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
    <div className="app-container">
      <h2>Your Assignments</h2>
      <Link to="/teacher/create"><button>Create Assignment</button></Link>
      {error && <div className="error">{error}</div>}
      <ul>
        {assignments
          .filter(a => a.created_by === user.id)
          .map(a => (
            <li key={a.id}>
              <strong>{a.title}</strong>: {a.description}
              <Link to={`/teacher/submissions/${a.id}`}> View Submissions </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard; 