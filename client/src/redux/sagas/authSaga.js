import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  loadUserFromToken, updateUserSuccess,
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

function* loadUserSaga() {
  try {
    const { data } = yield call(api.get, '/auth/me');
    if (data.user) {
      yield put(updateUserSuccess(data.user));
    }
  } catch (error) {
    // Token is invalid or expired; clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loadUserFromToken.type, loadUserSaga);
}
