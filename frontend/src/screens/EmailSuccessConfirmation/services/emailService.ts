import api from '@helpers/api.helper';

const emailService = {
  getUserProfile: async verifiedKey => api.get(`/api/activate/${verifiedKey}`)
};

export default emailService;
