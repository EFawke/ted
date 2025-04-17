import { useAuth } from './authentication/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated } = useAuth();

  // While auth state is loading, show nothing
  if (!isAuthenticated && !user) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (adminOnly && !user?.isAdmin) return <Navigate to="/" replace />;
  
  return children;
};