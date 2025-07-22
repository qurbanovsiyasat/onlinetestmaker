import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
console.log("Navbar render edildi");
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth() || {}; // Fallback if context is undefined

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">
        <Link to="/">OnlineTestMaker</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:underline">Admin Panel</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
