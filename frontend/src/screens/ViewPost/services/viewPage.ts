import api from '@helpers/api.helper';

const viewPageService = {
  getData: async id => api.get(`/api/post/${id}`)
};

export default viewPageService;
