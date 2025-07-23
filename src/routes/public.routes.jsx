import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export const PublicRoute = ({ redirectTo = "/" }) => {
  const { cookies } = useAuth();
  return !cookies.token ? <Outlet /> : <Navigate to={redirectTo} replace />;
};