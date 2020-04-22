import { call, put, takeLatest } from 'redux-saga/effects'
import { SetsDataAction, GameActivityAction } from './interfaces';
import { getSetsData, getGameActivity, getGameActivityDeck } from 'api';
import {
  requestSetsDataSuccess, requestSetsDataFailed, REQUEST_SETS_DATA,
  requestGameActivitySuccess, requestGameActivityFailed, REQUEST_GAME_ACTIVITY, REQUEST_GAME_ACTIVITY_DECK, requestGameActivityDeckSuccess
} from './actions';

function* fetchGameActivity(action: GameActivityAction) {
  try {
    const gameActivity = yield call(getGameActivity);
    if(gameActivity) {
      yield put(requestGameActivitySuccess(gameActivity));
    } else {
      throw 'Request failed';
    }
  } catch(e) {
    yield put(requestGameActivityFailed(e));
  }
}

function* fetchGameActivityDeck(action: GameActivityAction) {
  try {
    const gameActivity = yield call(getGameActivityDeck);
    if(gameActivity) {
      yield put(requestGameActivityDeckSuccess(gameActivity));
    } else {
      throw 'Request failed';
    }
  } catch(e) {
    yield put(requestGameActivityFailed(e));
  }
}

function* fetchSetsData(action: SetsDataAction) {
  try {
    const setsData = yield call(getSetsData);
    if(setsData) {
      yield put(requestSetsDataSuccess(setsData));
    } else {
      throw 'Request failed';
    }
  } catch(e) {
    yield put(requestSetsDataFailed(e));
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_GAME_ACTIVITY, fetchGameActivity);
  yield takeLatest(REQUEST_GAME_ACTIVITY_DECK, fetchGameActivityDeck);
  yield takeLatest(REQUEST_SETS_DATA, fetchSetsData);
}
