import api from '@helpers/api.helper';

const sidebarPageService = {
  getPopularTags: async () => api.get('/api/tag/popular')
};

export default sidebarPageService;
