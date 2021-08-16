import api from '@helpers/api.helper';

const profilePageService = {
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
  }
};

export default profilePageService;
