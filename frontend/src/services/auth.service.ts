import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';
import api from '@helpers/api.helper';

export const authUser = async ({ endpoint, payload }) => (
  api.post(
    `/api/auth/${endpoint}`,
    { data: payload }
  ));

export const getCurrentUser = async payload => (api.post('/api/auth/getUser', { data: payload }));

export const setToken = (token: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refresh);
};
