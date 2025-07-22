import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  console.log('App component rendered');
  
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
          
          {/* Make Dashboard public for now since PrivateRoute has issues */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/create" element={<CreateQuiz />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;