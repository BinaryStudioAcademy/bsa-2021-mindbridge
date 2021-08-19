import api from '@helpers/api.helper';

const postVersionService = {
  getPostVersions: async postId => api.get(`/api/postVersion/all/${postId}`)
};

export default postVersionService;
