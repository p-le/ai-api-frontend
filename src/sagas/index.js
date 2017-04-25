import { select, takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import { updateAccessToken } from '../actions/AuthActions/actions';
import * as AuthTypes from '../actions/AuthActions/types';


function* fetchAccessToken(action) {
  const authState = yield select(state => state.auth);
  console.log(action);

  yield put(updateAccessToken("aaabbbccc"));
  yield call((endpoint, code) => {
    const url = `${Config.backend}/auth`;
    axios.post(url, {
      code
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }, authState.currentEndpoint, authState.code);
}

function* rootSaga() {
  yield takeEvery(AuthTypes.GET_CODE, fetchAccessToken);
}

export default rootSaga;