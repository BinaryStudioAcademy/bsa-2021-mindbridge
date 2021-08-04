import api from '@helpers/api.helper';

const feedPageService = {
  getData: async () => api.get('/api/post/all')
};

export default feedPageService;
