import api from '@helpers/api.helper';

const emailService = {
  getUserProfile: async code => api.get(`/api/activate/${code}`)
};

export default emailService;
