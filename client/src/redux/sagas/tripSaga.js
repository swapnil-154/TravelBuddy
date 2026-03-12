import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchTripsRequest, fetchTripsSuccess, fetchTripsFailure,
  fetchTrip, fetchTripSuccess,
  createTrip, createTripSuccess,
  updateTrip, updateTripSuccess,
  deleteTrip, deleteTripSuccess,
} from '../slices/tripSlice';

function* fetchTripsSaga() {
  try {
    const { data } = yield call(api.get, '/trips');
    yield put(fetchTripsSuccess(data.trips));
  } catch (error) {
    yield put(fetchTripsFailure(error.response?.data?.message || 'Failed to fetch trips'));
  }
}

function* fetchTripSaga(action) {
  try {
    const { data } = yield call(api.get, `/trips/${action.payload}`);
    yield put(fetchTripSuccess(data.trip));
  } catch (error) {
    yield put(fetchTripsFailure(error.response?.data?.message || 'Failed to fetch trip'));
  }
}

function* createTripSaga(action) {
  try {
    const { data } = yield call(api.post, '/trips', action.payload);
    yield put(createTripSuccess(data.trip));
  } catch (error) {
    yield put(fetchTripsFailure(error.response?.data?.message || 'Failed to create trip'));
  }
}

function* updateTripSaga(action) {
  try {
    const { data } = yield call(api.put, `/trips/${action.payload.id}`, action.payload.data);
    yield put(updateTripSuccess(data.trip));
  } catch (error) {
    yield put(fetchTripsFailure(error.response?.data?.message || 'Failed to update trip'));
  }
}

function* deleteTripSaga(action) {
  try {
    yield call(api.delete, `/trips/${action.payload}`);
    yield put(deleteTripSuccess(action.payload));
  } catch (error) {
    yield put(fetchTripsFailure(error.response?.data?.message || 'Failed to delete trip'));
  }
}

export default function* tripSaga() {
  yield takeLatest(fetchTripsRequest.type, fetchTripsSaga);
  yield takeLatest(fetchTrip.type, fetchTripSaga);
  yield takeLatest(createTrip.type, createTripSaga);
  yield takeLatest(updateTrip.type, updateTripSaga);
  yield takeLatest(deleteTrip.type, deleteTripSaga);
}
