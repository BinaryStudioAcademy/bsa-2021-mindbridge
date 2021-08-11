import api from '@helpers/api.helper';

const headerService = {
  getNotificationCount: async (userId: string) => api.get(`/api/notification/count/${userId}`),
  getNotificationList: async (userId: string) => api.get(`/api/notification/list/${userId}`)
};

export default headerService;
