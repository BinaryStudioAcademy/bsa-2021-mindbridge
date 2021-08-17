import api from '@helpers/api.helper';

const pullRequestService = {
  getPR: async (id: string) => api.get(`/api/postPR/${id}`),
};

export default pullRequestService;
