import api from '@helpers/api.helper';

const draftsService = {
  fetchDrafts: async userId => api.get(`/api/post/drafts/${userId}`)
};

export default draftsService;
