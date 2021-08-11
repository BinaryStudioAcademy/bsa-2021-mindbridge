import api from '@helpers/api.helper';

const feedPageService = {
  getData: async (filter: object) => api.get('/api/post/all', { params: filter })
};

export default feedPageService;
