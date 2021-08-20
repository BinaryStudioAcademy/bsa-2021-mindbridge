import api from '@helpers/api.helper';

const postVersionService = {
  getVersion: async (id: string) => api.get(`/api/post/version/${id}`)
};

export default postVersionService;
