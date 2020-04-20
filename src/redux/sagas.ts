import { call, put, takeLatest } from 'redux-saga/effects'
import { SetsDataAction } from './interfaces';
import { getSetsData } from 'api';
import { requestSetsDataSuccess, requestSetsDataFailed, REQUEST_SETS_DATA } from './actions';

function* fetchSetsData(action: SetsDataAction) {
  try {
    const setsData = yield call(getSetsData);
    yield put(requestSetsDataSuccess(setsData));
  } catch(e) {
    console.error(e);
    yield put(requestSetsDataFailed('Request failed'));
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_SETS_DATA, fetchSetsData);
}
