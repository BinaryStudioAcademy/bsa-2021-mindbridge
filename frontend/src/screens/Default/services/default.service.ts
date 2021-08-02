import api from '@helpers/api.helper';

const defaultService = {
  getData: async () => api.get('/api/data/')
};

export default defaultService;
