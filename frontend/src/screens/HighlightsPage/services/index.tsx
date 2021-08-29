import api from '@helpers/api.helper';

const highlightsPageService = {
  getHighlights: async id => api.get(`/api/highlight/all/${id}`),
  deleteHighlight: async id => api.delete(`/api/highlight/delete/${id}`)
};

export default highlightsPageService;
