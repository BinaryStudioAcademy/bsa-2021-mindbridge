import api from '@helpers/api.helper';

const viewPageService = {
  getData: async id => api.get(`/api/post/${id}`),
  sendComment: async (comment: object) => api.post(
    '/api/comment/add',
    { data: comment }
  ),
  sendReply: async (reply: object) => api.post(
    '/api/comment/reply',
    { data: reply }
  ),
  leaveReactionComment: async (comment: object) => api.put(
    '/api/commentreaction',
    {
      data: comment
    }
  ),
  getUsersByNickname: async (query: object) => api.get('/api/user/find/', { params: query })
};

export default viewPageService;
