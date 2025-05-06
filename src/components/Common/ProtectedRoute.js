import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>; // Veya bir loading spinner
  }

  if (!currentUser) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı giriş yapmışsa istenen içeriği göster
  return children;
};

export default ProtectedRoute;