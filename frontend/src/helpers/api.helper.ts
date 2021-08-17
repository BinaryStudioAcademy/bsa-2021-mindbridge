import { toastr } from 'react-redux-toastr';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { handleOnClickSignOut } from '@helpers/signOut.helper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';

function handleBadResponse(error: AxiosError) {
  const errorMessage = 'Sorry, you are not authorized to access this page. Please login again.';
  if (error.response.status === 401) {
    handleOnClickSignOut();
    toastr.error('Error', errorMessage);
  }
  throw error.response.data;
}

function handleMissingResponse(error: AxiosError) {
  const errorMessage = 'No response was received';
  // eslint-disable-next-line no-console
  console.error(errorMessage, {
    request: {
      url: error.request.url,
      method: error.request.method,
      headers: error.request.headers,
      body: error.request.body
    }
  });
  toastr.error('Error', errorMessage);
  throw new Error(errorMessage);
}

function handleBadRequest(error: AxiosError) {
  const errorMessage = 'Error in setting up the request';
  // eslint-disable-next-line no-console
  console.error(errorMessage, error.message);
  toastr.error('Error', errorMessage);
  throw new Error(errorMessage);
}

function handleApiCallError(error: AxiosError): void {
  if (error.response) {
    handleBadResponse(error);
  } else if (error.request) {
    handleMissingResponse(error);
  } else {
    handleBadRequest(error);
  }
}

const refreshTokens = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    const response = await axios('/api/auth/refresh', { data: { refreshToken }, method: 'POST' });
    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
  } catch (e) {
    if (e.response.status === 401) {
      handleOnClickSignOut();
    } else {
      handleApiCallError(e);
      throw new Error('Unhandled error');
    }
  }
};

const callApi = async (path: string, config: AxiosRequestConfig): Promise<any> => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    try {
      return (await axios(path, { ...config, headers: { authorization: `Bearer ${token}` } })).data;
    } catch (e) {
      if (e.response.status === 401) {
        await refreshTokens();
        return (await axios(path,
          { ...config,
            headers: {
              authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
          })).data;
      }
      handleApiCallError(e);
      throw new Error('Unhandled error');
    }
  } else {
    try {
      return (await axios(path, config)).data;
    } catch (e) {
      handleApiCallError(e);
      throw new Error('Unhandled error');
    }
  }
};

const api = {
  get: async (path: string, config?: AxiosRequestConfig) => callApi(path, { ...config, method: 'GET' }),
  post: async (path: string, config?: AxiosRequestConfig) => callApi(path, { ...config, method: 'POST' }),
  put: async (path: string, config?: AxiosRequestConfig) => callApi(path, { ...config, method: 'PUT' }),
  patch: async (path: string, config?: AxiosRequestConfig) => callApi(path, { ...config, method: 'PATCH' }),
  delete: async (path: string, config?: AxiosRequestConfig) => callApi(path, { ...config, method: 'DELETE' })
};

export default api;
