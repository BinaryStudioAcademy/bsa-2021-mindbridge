import api from '@helpers/api.helper';

const profilePageService = {
  getData: async () => api.get('/api/post/all')
};

export default profilePageService;
