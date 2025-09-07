import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import NotesList from './components/NotesList';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPasswordForm from './components/ForgotPasswordForm'; // Import ForgotPasswordForm

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading app..." />
      </div>
    );
  }

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <AuthPage />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <NotesList />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} /> {/* Add this route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

