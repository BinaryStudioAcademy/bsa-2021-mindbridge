import api from '@helpers/api.helper';

const createPostService = {
  getData: async () => api.get('/api/user/b9eb8231-5422-4d6f-906b-eeb55da1edd1'),
  getPostVersions: async () => api.get('/api/post/versions/6dd35066-4b3b-4321-a576-dd249c45603d')
};

export default createPostService;
