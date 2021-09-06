import api from '@helpers/api.helper';

const pullRequestService = {
  getPR: async (id: string) => api.get(`/api/postPR/${id}`),
  putClosedPR: async (id: string) => api.put(`/api/postPR/close/${id}`),
  putAcceptedPR: async (id: string) => api.put(`/api/postPR/accept/${id}`),
  postEditedPR: async (postPr: object) => api.post('/api/postPR/edit', { data: postPr }),
  fetchMyPRs: async (id: string) => api.get(`/api/postPR/byUser/${id}`),
  sendCommentToPr: async (comment: object) => api.post(
    '/api/commentPR/add',
    { data: comment }
  ),
  editPrComment: async (comment: object) => api.get(
    '/api/commentPR/edit',
    { data: comment }
  )
};

export default pullRequestService;
