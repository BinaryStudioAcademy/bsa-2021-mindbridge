import api from '@helpers/api.helper';

const draftsService = {
  fetchDrafts: async userId => api.get(`/api/post/drafts/${userId}`),
  fetchMyPosts: async userId => api.get(`/api/post/allMy/${userId}`)
};

export default draftsService;
