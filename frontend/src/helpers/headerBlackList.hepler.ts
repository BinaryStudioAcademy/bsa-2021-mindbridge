import { history } from '@helpers/history.helper';

export const checkHeaderShown = () => {
  const headerBlackList = ['/login', '/registration'];

  return headerBlackList.every(item => !history.location.pathname.startsWith(item));
};
