import { IFetchData } from '@models/IFetchData';
import { IFetchArgs } from '@models/IFetchArgs';
import * as queryString from 'query-string';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Login/constants/auth_constants';
import { handleOnClickSignOut } from '@helpers/signOut.helper';
import { toastr } from 'react-redux-toastr';

const getFetchUrl = ({ endpoint, queryParams }: IFetchData) => `${endpoint}${
  queryParams ? `?${queryString.stringify(queryParams)}` : ''
}`;

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const getFetchArgs = (args: IFetchData): IFetchArgs => {
  const headers = getInitHeaders();
  let body;
  if (args.requestData) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.requestData);
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return {
    method: args.type,
    headers,
    ...(args.requestData === 'GET' ? {} : { body })
  };
};

const handleBadResponse = async (res: Response) => {
  const errorMessage = 'Sorry, you are not authorized to access this page. Please login again.';
  if (!res.ok) {
    if (res.status === 401) {
      handleOnClickSignOut();
      toastr.error('Error', errorMessage);
    }
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred: ${err}`);
    }
    throw parsedException;
  }
};

const refreshToken = async () => {
  const token = localStorage.getItem(REFRESH_TOKEN);

  const headers = getInitHeaders();
  if (token) {
    headers.set('Refresh-token', token);
  }

  const response = await fetch('/api/auth/refresh', { headers, method: 'POST' });
  return response.json();
};

export const callApi = async (args: IFetchData): Promise<any> => {
  let res = await fetch(getFetchUrl(args), getFetchArgs(args));

  if (res.status === 401 && localStorage.getItem(REFRESH_TOKEN)) {
    const tokenRefreshResponse = await refreshToken();

    if (tokenRefreshResponse.accessToken) {
      localStorage.setItem(ACCESS_TOKEN, tokenRefreshResponse.accessToken);
      res = await fetch(getFetchUrl(args), getFetchArgs(args));
    }
  }
  await handleBadResponse(res);
  return res;
};
