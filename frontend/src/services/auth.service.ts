import { callApi } from '@helpers/auth.helper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';
import api from '@helpers/api.helper';

export const authUser = async ({ endpoint, payload }) => {
  const response = await callApi({
    endpoint: `/api/auth/${endpoint}`,
    type: 'POST',
    requestData: payload
  });
  return response.json();
};

export const getCurrentUser = async ( payload ) =>
  (await api.post('/auth/getUser', { data: payload }));

export const setToken = (token: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refresh);
};
