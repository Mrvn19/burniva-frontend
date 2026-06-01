import api from '../api';

const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  suspendUser: async (id) => {
    const response = await api.put(`/admin/users/${id}/suspend`);
    return response.data;
  },

  resetDailyInput: async (id) => {
    const response = await api.delete(`/admin/users/${id}/reset-input`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  getMonitoringData: async (period = 'mingguan') => {
    const response = await api.get(`/admin/monitoring?period=${period}`);
    return response.data;
  },

  getAnalyticsData: async (period = '', univ = '', prodi = '') => {
    const params = new URLSearchParams();
    if (period) params.append('period', period);
    if (univ) params.append('univ', univ);
    if (prodi) params.append('prodi', prodi);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/admin/analytics${queryString}`);
    return response.data;
  },

  getFilterOptions: async () => {
    const response = await api.get('/admin/filter-options');
    return response.data;
  },

  getRecentActivities: async () => {
    const response = await api.get('/admin/activities');
    return response.data;
  },

  downloadReport: async () => {
    const response = await api.get('/admin/export-csv', { responseType: 'blob' });
    return response.data;
  },

  downloadExcelReport: async () => {
    const response = await api.get('/admin/export-excel', { responseType: 'blob' });
    return response.data;
  }
};

export default adminService;
