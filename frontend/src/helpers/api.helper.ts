import { toastr } from 'react-redux-toastr';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

function handleBadResponse(error: AxiosError) {
  if (error.response.status === 401) {
    // logout
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

export const callApi = async (path: string, config: AxiosRequestConfig): Promise<any> => {
  try {
    return (await axios(path, config)).data;
  } catch (e) {
    handleApiCallError(e);
    throw new Error('Unhandled error');
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
