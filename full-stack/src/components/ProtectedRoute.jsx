import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    // Only set shouldNavigate when auth has finished initializing
    if (isInitialized) {
      if (!isLoggedIn) {
        setShouldNavigate(true);
      } else {
        // User is logged in, don't navigate
        setShouldNavigate(false);
      }
    }
  }, [isInitialized, isLoggedIn]);

  // Show loading while checking authentication
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not logged in
  if (shouldNavigate) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
