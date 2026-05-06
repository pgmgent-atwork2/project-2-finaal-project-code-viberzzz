import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();

  // Show loading while checking authentication
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to sign-in if not logged in
  // DISABLED FOR TESTING
  // if (!isLoggedIn) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return children;
};

export default ProtectedRoute;
