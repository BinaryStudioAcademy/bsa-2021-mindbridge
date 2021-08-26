import api from '@helpers/api.helper';

const highlightsPageService = {
  getHighlights: async () => api.get('/api/highlight/all')
};

export default highlightsPageService;
