import api from '@helpers/api.helper';

const viewPageService = {
  getData: async () => api.get('/api/post/ccb9f16b-e852-4ffb-b5e4-87247d978fd9')
};

export default viewPageService;
