import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/login';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import AquariumDashboard from './pages/AquariumDashboard';
import './App.css';

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout (includes navbar) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <AquariumDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/units"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/planning"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home3 />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
