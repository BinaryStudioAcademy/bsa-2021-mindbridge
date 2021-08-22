import api from '@helpers/api.helper';

const feedPageService = {
  getData: async (filter: object) => api.get('/api/post/all', { params: filter }),
  likePost: async (post: object) => api.put(
    '/api/postreaction',
    {
      data: post
    }
  )
};

export default feedPageService;
