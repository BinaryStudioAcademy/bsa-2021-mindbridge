import api from '@helpers/api.helper';

const headerService = {
  getNotificationCount: async (userId: string) => api.get(`/api/notification/count/${userId}`),
  getNotificationList: async (userId: string) => api.get(`/api/notification/list/${userId}`),
  getUnreadNotificationList: async (userId: string) => api.get(`/api/notification/unreadList/${userId}`),
  markAllNotificationsRead: async (userId: string) => api.put(`/api/notification/readAll/${userId}`),
  getPostByElastic: async (query: object) => api.get('/api/search/', { params: query }),
  markNotificationRead: async (notificationId: string) => api.put(`/api/notification/${notificationId}`)
};

export default headerService;
