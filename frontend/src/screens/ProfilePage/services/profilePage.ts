import { callApi } from '@helpers/auth.helper';

const profilePageService = {
  sendForm: async ({ endpoint, payload }) => {
    const response = await callApi({
      endpoint: `/api/user/update/${endpoint}`,
      type: 'POST',
      requestData: payload
    });
    return response.json();
  },
  sendNickname: async ({ endpoint, payload }) => {
    const response = await callApi({
      endpoint: `/api/user/check/${endpoint}`,
      type: 'POST',
      requestData: payload
    });
    return response.json();
  }
};

export default profilePageService;
