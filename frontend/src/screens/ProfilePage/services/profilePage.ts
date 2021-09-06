import api from '@helpers/api.helper';

const profilePageService = {
  getUser: async ({ endpoint }) => {
    const response = await api.get(
      `/api/user/${endpoint}`
    );
    return response;
  },
  sendForm: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/user/update/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  sendNickname: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/user/check/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  deleteAvatar: async ({ endpoint }) => {
    const response = await api.post(
      `/api/user/delete/avatar/${endpoint}`
    );
    return response;
  },
  sendChangePasswordForm: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/user/update/password/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  sendPassword: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/user/check/password/${endpoint}`,
      { data: payload }
    );
    return response;
  },
  sendAvatar: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/image/${endpoint}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: payload }
    );
    return response;
  },
  updateAvatar: async ({ endpoint, payload }) => {
    const response = await api.post(
      `/api/user/update/avatar/${endpoint}`,
      {
        data: payload }
    );
    return response;
  },
  toggleFollowUser: async (request: object) => api.put('/api/user/follow', { data: request })
};

export default profilePageService;
