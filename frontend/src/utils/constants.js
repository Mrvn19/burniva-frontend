export const API_BASE_URL =
import.meta.env.VITE_API_URL ||
'http://localhost:5000/api/v1'

export const BURNOUT_LEVELS = {
  LOW:    { label: 'Rendah', color: 'text-emerald-700',  bg: 'bg-emerald-50',  border: 'border-emerald-200', dot: 'bg-emerald-500'  },
  MEDIUM: { label: 'Sedang', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' },
  HIGH:   { label: 'Tinggi', color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500'    },
}

export const getBurnoutLevel = (score) => {
  if (score < 40) return BURNOUT_LEVELS.LOW
  if (score < 70) return BURNOUT_LEVELS.MEDIUM
  return BURNOUT_LEVELS.HIGH
}

export const ROUTES = {
  HOME:           '/',
  LOGIN:          '/login',
  REGISTER:       '/register',
  DASHBOARD:      '/dashboard',
  INPUT:          '/input',
  RESULT:         '/result',
  RESULT_DETAIL:  '/result/:id',
  TODO:           '/todo',
  HISTORY:        '/riwayat',
  HISTORY_DETAIL: '/riwayat/:id', // <-- Rute dinamis baru untuk detail riwayat harian
  PROFILE:        '/profil',
  TEAM:           '/team',
  ABOUT:          '/tentang',
}