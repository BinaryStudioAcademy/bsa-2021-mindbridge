import api from '@helpers/api.helper';

const createPostService = {
  getData: async () => api.get('/api/user/b9eb8231-5422-4d6f-906b-eeb55da1edd1')
};

export default createPostService;
