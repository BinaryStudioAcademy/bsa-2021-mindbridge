import api from '@helpers/api.helper';

const postVersionService = {
  getVersion: async (id: string) => api.get(`/api/postVersion/${id}`)
};

export default postVersionService;
