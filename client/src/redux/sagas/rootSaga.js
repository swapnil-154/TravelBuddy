import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import tripSaga from './tripSaga';
import bookingSaga from './bookingSaga';
import searchSaga from './searchSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    tripSaga(),
    bookingSaga(),
    searchSaga(),
  ]);
}
