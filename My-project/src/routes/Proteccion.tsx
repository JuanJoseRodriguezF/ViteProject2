import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from '../auth/AuthProv'

export default function ProtectedRoute() {
  const auth = useAuth()

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}