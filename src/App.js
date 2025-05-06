import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AuthScreen from './pages/AuthScreen';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route component
function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return currentUser ? children : <Navigate to="/auth" />;
}

// Admin Route component
function AdminRoute({ children }) {
  const { currentUser, userData, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return currentUser && userData?.role === 'admin' ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Auth Route */}
        <Route path="/auth" element={<AuthScreen />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/books" element={
          <PrivateRoute>
            <BookList />
          </PrivateRoute>
        } />
        <Route path="/books/:id" element={
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/add-book" element={
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        } />
        <Route path="/edit-book/:id" element={
          <AdminRoute>
            <EditBook />
          </AdminRoute>
        } />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/auth" />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
