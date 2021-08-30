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
  )
};

export default viewPageService;
