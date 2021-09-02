import api from '@helpers/api.helper';

const feedPageService = {
  getData: async (filter: object) => api.get('/api/post/all', { params: filter }),
  getHotPosts: async (filter: object) => api.get('/api/post/hots', { params: filter }),
  getBestPosts: async (filter: object) => api.get('/api/post/bests', { params: filter }),
  likePost: async (post: object) => api.put(
    '/api/postreaction',
    {
      data: post
    }
  )
};

export default feedPageService;
