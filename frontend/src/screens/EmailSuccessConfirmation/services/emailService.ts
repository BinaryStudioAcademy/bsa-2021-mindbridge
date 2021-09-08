import api from '@helpers/api.helper';

const emailService = {
  getUserProfile: async (code: string) => api.get(`/api/auth/activate/${code}`)
};

export default emailService;
