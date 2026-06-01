import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import useAuthStore from '../store/auth/useAuthStore'

function ProtectedRoute() {
  const token = localStorage.getItem('token')
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const user = useAuthStore(s => s.user)

  if (!token || !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute