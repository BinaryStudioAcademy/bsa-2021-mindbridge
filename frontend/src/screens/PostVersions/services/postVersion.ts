import api from '@helpers/api.helper';

const postVersionService = {
  getPostTitle: async postId => api.get(`/api/post/title/${postId}`)
};

export default postVersionService;
