export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short'
  })
}

export const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
  })
}

export const getTodayString = () => {
  const today = new Date()
  return today.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric',
    month: 'long', year: 'numeric'
  })
}

export const isToday = (dateString) => {
  if (!dateString) return false;
  const d = new Date(dateString);
  const today = new Date();
  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const getInitials = (name = '') => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}