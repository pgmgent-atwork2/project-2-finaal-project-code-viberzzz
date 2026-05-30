import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Home2 from "./pages/Planning";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import Units from "./pages/Units";
import Unit from "./pages/Unit";
import SupabaseTest from "./pages/supabaseTest";
import AquariumDashboard from "./pages/AquariumDashboard";
import "./App.css";

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
            path="/units/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Unit />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/units"
            element={
              <ProtectedRoute>
                <Layout>
                  <Units />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/planning"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home2 />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/supabase-test" element={<SupabaseTest />} />

          <Route
            path="/supabase-test"
            element={
              <ProtectedRoute>
                <Layout>
                  <SupabaseTest />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Layout>
                  <Admin />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
