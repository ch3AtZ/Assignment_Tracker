import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignmentCreate() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('username', user.username);
    if (file) data.append('file', file);
    try {
      const res = await fetch('/assignments/create', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Failed to create assignment');
      navigate('/teacher');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container modern-form" style={{ background: '#e3f2fd' }}>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Create</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AssignmentCreate; 