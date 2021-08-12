import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Login/constants/auth_constants';
import { history } from '@helpers/history.helper';

export const handleOnClickSignOut = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  history.push('/login');
  history.go();
};
