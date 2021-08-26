import { all } from 'redux-saga/effects';
import sidebarPageSagas from '@screens/Sidebar/containers/SidebarPage/sagas';

export default function* sidebarSagas() {
  yield all([
    sidebarPageSagas()
  ]);
}
