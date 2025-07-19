import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Assignment Submitter</div>
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
      <div className="home-center">
        <h1>Assignment Submitter</h1>
      </div>
    </div>
  );
}

export default Home; 