import api from '@helpers/api.helper';

const headerService = {
  getNotificationCount: async (userId: string) => api.get(`/api/notification/count/${userId}`),
  getNotificationList: async (userId: string) => api.get(`/api/notification/list/${userId}`),
  getPostByElastic: async (query: object) => api.get('/api/search/', { params: query })
};

export default headerService;
