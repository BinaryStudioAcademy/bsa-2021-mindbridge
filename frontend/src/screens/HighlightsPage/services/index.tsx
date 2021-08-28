import api from '@helpers/api.helper';

const highlightsPageService = {
  getHighlights: async id => api.get(`/api/highlight/all/${id}`)
};

export default highlightsPageService;
