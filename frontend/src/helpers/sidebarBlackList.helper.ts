import { history } from '@helpers/history.helper';

export const checkSidebarShown = () => {
  const sidebarBlackList = ['/login', '/registration', '/activate'];

  return sidebarBlackList.every(item => !history.location.pathname.startsWith(item));
};
