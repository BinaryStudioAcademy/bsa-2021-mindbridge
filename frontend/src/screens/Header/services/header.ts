import api from '@helpers/api.helper';

const headerService = {
  getNotificationCount: async () => api.get('/api/notification/count'),
  getNotificationList: async () => api.get('/api/notification/list')
};

export default headerService;
