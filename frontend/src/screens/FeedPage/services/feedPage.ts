import api from '@helpers/api.helper';

const feedPageService = {
  getData: async () => api.get('/api/posts/all')
};

export default feedPageService;
