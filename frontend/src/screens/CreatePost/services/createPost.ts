import api from '@helpers/api.helper';

const createPostService = {
  getData: async () => api.get('/api/data/')
};

export default createPostService;
