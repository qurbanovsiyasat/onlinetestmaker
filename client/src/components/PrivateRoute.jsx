import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  
  console.log('PrivateRoute: Checking user access');
  console.log('PrivateRoute: User exists:', !!user);
  console.log('PrivateRoute: User details:', user);
  
  // Show loading while determining auth status
  if (user === undefined) {
    console.log('PrivateRoute: User is undefined, showing loading');
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <h3>🔄 Loading...</h3>
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }
  
  // If no user, redirect to login
  if (!user) {
    console.log('PrivateRoute: No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated, render the protected component
  console.log('PrivateRoute: User authenticated, rendering protected route');
  return <Outlet />;
};

export default PrivateRoute;