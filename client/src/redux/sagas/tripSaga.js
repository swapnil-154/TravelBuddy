import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchTripsRequest, fetchTripsSuccess, fetchTripsFailure,
  fetchTripSuccess, createTripSuccess, updateTripSuccess, deleteTripSuccess,
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

export const FETCH_TRIPS = 'trips/fetchTripsRequest';
export const FETCH_TRIP = 'trips/fetchTrip';
export const CREATE_TRIP = 'trips/createTrip';
export const UPDATE_TRIP = 'trips/updateTrip';
export const DELETE_TRIP = 'trips/deleteTrip';

export default function* tripSaga() {
  yield takeLatest(fetchTripsRequest.type, fetchTripsSaga);
  yield takeLatest('trips/fetchTrip', fetchTripSaga);
  yield takeLatest('trips/createTrip', createTripSaga);
  yield takeLatest('trips/updateTrip', updateTripSaga);
  yield takeLatest('trips/deleteTrip', deleteTripSaga);
}
