import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchDestinationsRequest, fetchDestinationsSuccess, fetchDestinationsFailure,
  fetchDestination, fetchDestinationSuccess, setSearchResults,
} from '../slices/destinationSlice';

function* fetchDestinationsSaga(action) {
  try {
    const params = action.payload || {};
    const queryString = new URLSearchParams(params).toString();
    const { data } = yield call(api.get, `/destinations?${queryString}`);
    yield put(fetchDestinationsSuccess(data));
  } catch (error) {
    yield put(fetchDestinationsFailure(error.response?.data?.message || 'Failed to fetch destinations'));
  }
}

function* fetchDestinationSaga(action) {
  try {
    const { data } = yield call(api.get, `/destinations/${action.payload}`);
    yield put(fetchDestinationSuccess(data.destination));
  } catch (error) {
    yield put(fetchDestinationsFailure(error.response?.data?.message || 'Failed to fetch destination'));
  }
}

function* searchDestinationsSaga(action) {
  try {
    if (!action.payload || action.payload.length < 2) {
      yield put(setSearchResults([]));
      return;
    }
    const { data } = yield call(api.get, `/destinations/search?q=${action.payload}`);
    yield put(setSearchResults(data.destinations));
  } catch (error) {
    yield put(setSearchResults([]));
  }
}

export default function* searchSaga() {
  yield takeLatest(fetchDestinationsRequest.type, fetchDestinationsSaga);
  yield takeLatest(fetchDestination.type, fetchDestinationSaga);
  yield debounce(300, 'destinations/searchDestinations', searchDestinationsSaga);
}
