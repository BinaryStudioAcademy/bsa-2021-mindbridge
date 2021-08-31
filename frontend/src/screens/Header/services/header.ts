import api from '@helpers/api.helper';

const headerService = {
  getNotificationCount: async (userId: string) => api.get(`/api/notification/count/${userId}`),
  getNotificationList: async (filter: any) => api.get(`/api/notification/list/${filter.userId}`, {
    params: {
      onlyUnread: filter.onlyUnread,
      from: filter.params.from,
      count: filter.params.count
    } }),
  markAllNotificationsRead: async (userId: string) => api.put(`/api/notification/readAll/${userId}`),
  getPostByElastic: async (query: object) => api.get('/api/search/', { params: query }),
  markNotificationRead: async (notificationId: string) => api.put(`/api/notification/${notificationId}`)
};

export default headerService;
