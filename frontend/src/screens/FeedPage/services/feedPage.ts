import api from '@helpers/api.helper';

const feedPageService = {
  getData: async (filter: object) => api.get('/api/post/all', { params: filter }),
  likePost: async (post: object) => api.put(
    '/api/postreaction',
    {
      data: post
    }
  ),
  searchPosts: async (filter: object) => api.get('/api/search/list', { params: filter }),
  loadCountResults: async (query: string) => api.get('/api/search/count', { params: { query } })
};

export default feedPageService;
