import { all } from 'redux-saga/effects';
import pullRequestPageSagas from '@screens/PullRequest/containers/PullRequestPage/sagas';

export default function* pullRequestSagas() {
  yield all([
    pullRequestPageSagas()
  ]);
}
