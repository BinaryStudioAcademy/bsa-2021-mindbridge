import { getOsEnv } from 'helpers/path.helper';

export const env = {
  apiBaseUrl: getOsEnv('REACT_APP_API_BASE_URL'),
  clientBaseUrl: getOsEnv('REACT_APP_CLIENT_BASE_URL')
};
