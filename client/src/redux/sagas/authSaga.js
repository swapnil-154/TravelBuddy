import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
} from '../slices/authSlice';

function* loginSaga(action) {
  try {
    const { data } = yield call(api.post, '/auth/login', action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* registerSaga(action) {
  try {
    const { data } = yield call(api.post, '/auth/register', action.payload);
    yield put(registerSuccess(data));
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
