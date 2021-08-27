import { history } from '@helpers/history.helper';

export const checkSidebarShown = () => {
  const sidebarBlackList = ['/login', '/registration'];

  return sidebarBlackList.every(item => !history.location.pathname.startsWith(item));
};
