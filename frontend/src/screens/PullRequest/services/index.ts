import api from '@helpers/api.helper';

const pullRequestService = {
  getPR: async (id: string) => api.get(`/api/postPR/${id}`),
  putClosedPR: async (id: string) => api.put(`/api/postPR/close/${id}`)
};

export default pullRequestService;
