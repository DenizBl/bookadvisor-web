import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>; // Veya bir loading spinner
  }

  // Kullanıcı giriş yapmamışsa VEYA rolü admin değilse anasayfaya yönlendir
  if (!currentUser || userRole !== 'admin') {
    // Yetkisiz erişim loglanabilir veya bir uyarı mesajı gösterilebilir
    console.warn("Yetkisiz erişim denemesi (Admin):", currentUser?.email, "Rol:", userRole);
    return <Navigate to="/" replace />; // Veya özel bir "Yetkiniz Yok" sayfasına
  }

  // Kullanıcı admin ise istenen içeriği göster
  return children;
};

export default AdminRoute;