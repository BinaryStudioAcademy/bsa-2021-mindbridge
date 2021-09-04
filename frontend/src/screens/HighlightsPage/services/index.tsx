import api from '@helpers/api.helper';

const highlightsPageService = {
  getHighlights: async params => api.get(`/api/highlight/infinite/${params.user}`, { params }),
  deleteHighlight: async id => api.delete(`/api/highlight/delete/${id}`),
  getHighlightsWithPagination: async id => api.get(`/api/highlight/all/${id}`)
};

export default highlightsPageService;
