import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AssignmentCreate from './components/AssignmentCreate';
import AssignmentSubmissions from './components/AssignmentSubmissions';
import AssignmentSubmit from './components/AssignmentSubmit';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/create" element={<AssignmentCreate />} />
        <Route path="/teacher/submissions/:assignmentId" element={<AssignmentSubmissions />} />
        <Route path="/student/submit/:assignmentId" element={<AssignmentSubmit />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
