import api from '@helpers/api.helper';

const viewPageService = {
  getData: async () => api.get('/api/post/95a46088-b143-483d-a86c-3d6be6fd2e6d')
};

export default viewPageService;
