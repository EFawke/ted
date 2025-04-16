// ProtectedRoute.js
import { useAuth } from './authentication/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (adminOnly && !user?.isAdmin) return <Navigate to="/" replace />;
  
  return children;
};