import api from '@helpers/api.helper';

const viewPageService = {
  getData: async id => api.get(`/api/post/${id}`),
  saveHighlight: async payload => api.post(
    '/api/highlight/save',
    {
      data: payload
    }
  )
};

export default viewPageService;
