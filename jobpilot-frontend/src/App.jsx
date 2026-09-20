import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ApplicationForm from './pages/ApplicationForm.jsx';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/applications/new" element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          } />
          <Route path="/applications/:id/edit" element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/landing" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;