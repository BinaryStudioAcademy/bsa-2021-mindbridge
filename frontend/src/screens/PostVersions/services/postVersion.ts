import api from '@helpers/api.helper';

const postVersionService = {
  getPostTitle: async postId => api.get(`/api/post/title/${postId}`),
  getOpenPostContributions: async (postId: string) => api.get(`/api/postPR/open/${postId}`),
  getPostContributions: async (filter: any) => api.get(`/api/postPR/all/${filter.postId}`, { params: filter?.params }),
  getMyPostsContributions: async (userId: string) => api.get(`/api/postPR/byPostsAuthor/${userId}`)
};

export default postVersionService;
