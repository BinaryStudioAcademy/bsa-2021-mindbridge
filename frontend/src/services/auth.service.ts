import { callApi } from '@helpers/auth.helper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';

export const authUser = async ({ endpoint, payload }) => {
  const response = await callApi({
    endpoint: `/auth/${endpoint}`,
    type: 'POST',
    requestData: payload
  });
  return response.json();
};

export const getCurrentUser = async ({ payload }) => {
  const response = await callApi({
    endpoint: '/auth/getUser',
    type: 'POST',
    requestData: { refreshToken: payload }
  });

  return response.json();
};

export const setToken = (token: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refresh);
};
