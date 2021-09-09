import api from '@helpers/api.helper';

const feedPageService = {
  getData: async (filter: object) => api.get('/api/post/all', { params: filter }),
  getHotPosts: async (filter: object) => api.get('/api/post/hots', { params: filter }),
  getPostsByTag: async ({ endpoint, payload }) => api.get(`/api/post/${endpoint}`, { params: payload }),
  getBestPosts: async (filter: object) => api.get('/api/post/bests', { params: filter }),
  likePost: async (post: object) => api.put(
    '/api/postreaction',
    {
      data: post
    }
  ),
  searchPosts: async (filter: object) => api.get('/api/search/list', { params: filter }),
  loadCountResults: async (filter: object) => api.get('/api/search/count', { params: filter })
};

export default feedPageService;
