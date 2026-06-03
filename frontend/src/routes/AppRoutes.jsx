import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import MainLayout from '../components/layout/MainLayout'
import AdminRoute from './AdminRoute'

// PASTIKAN IMPOR SEPERTI INI (Tanpa tanda kurung kurawal {})
import ScrollToTop from '../components/common/ScrollToTop'
import { useAuthCheck } from '../hooks/useAuthCheck'

import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../pages/Dashboard'
import Input from '../pages/Input'
import Result from '../pages/Result'
import Todo from '../pages/Todo'
import History from '../pages/History'
import Profile from '../pages/Profile'

// Admin
import AdminLayout from '../components/layout/admin/AdminLayout'
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import PenggunaAdmin from '../pages/admin/PenggunaAdmin'
import MonitoringAdmin from '../pages/admin/MonitoringAdmin'
import AnalitikAdmin from '../pages/admin/AnalitikAdmin'
import ProfilAdmin from '../pages/admin/ProfilAdmin'

import TeamIdentityPage from '../pages/TeamIdentityPage'
import AboutBurnivaPage from '../pages/AboutBurnivaPage'

function AuthChecker() {
  useAuthCheck();
  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Komponen diletakkan di sini, tepat di dalam BrowserRouter */}
      <ScrollToTop />
      <AuthChecker />

      <Routes>
        <Route path={ROUTES.HOME} element={<Landing />} />
        <Route path={ROUTES.TEAM} element={<TeamIdentityPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutBurnivaPage />} />

        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.INPUT} element={<Input />} />
            <Route path={ROUTES.RESULT} element={<Result />} />
            <Route path={ROUTES.RESULT_DETAIL} element={<Result />} />
            <Route path={ROUTES.TODO} element={<Todo />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
            <Route path={ROUTES.HISTORY_DETAIL} element={<Result />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>
        </Route>

        {/* Rute Khusus Admin (Dilindungi) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/admin/pengguna" element={<PenggunaAdmin />} />
            <Route path="/admin/monitoring" element={<MonitoringAdmin />} />
            <Route path="/admin/analitik" element={<AnalitikAdmin />} />
            <Route path="/admin/profil" element={<ProfilAdmin />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes