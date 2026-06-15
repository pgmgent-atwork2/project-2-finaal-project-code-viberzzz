import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const { isLoggedIn, isInitialized, auth } = useAuth();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    // Only set shouldNavigate when auth has finished initializing
    if (isInitialized) {
      if (!isLoggedIn) {
        setShouldNavigate(true);
        setHasAccess(false);
      } else {
        // User is logged in, check role if allowedRoles is specified
        if (allowedRoles && auth?.user?.rol) {
          const userRole = auth.user.rol;
          const hasRoleAccess = allowedRoles.includes(userRole);
          setHasAccess(hasRoleAccess);
        } else {
          setHasAccess(true);
        }
        setShouldNavigate(false);
      }
    }
  }, [isInitialized, isLoggedIn, allowedRoles, auth]);

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

  // Redirect to home if user doesn't have required role
  if (!hasAccess) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
