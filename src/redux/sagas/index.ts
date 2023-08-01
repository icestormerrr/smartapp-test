import { all, fork } from 'redux-saga/effects';
import { rootDashboardSaga } from './dashboard';

function* rootSaga() {
  yield all([fork(rootDashboardSaga)]);
}

export default rootSaga;