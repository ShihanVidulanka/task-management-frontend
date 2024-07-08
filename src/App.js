import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './components/Home';
import './index.css';  // Ensure Tailwind CSS is included

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          {/* <ProtectedRoute path="/home" element={<Home/>} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
