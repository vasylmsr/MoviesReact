import { all, fork } from 'redux-saga/effects';
import { watchAuthSagas } from './auth/sagas';

export default function* watchSagas() {
  yield all([fork(watchAuthSagas)]);
}
