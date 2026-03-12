import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import {
  fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure,
  fetchBlog, fetchBlogSuccess,
} from '../slices/blogSlice';

function* fetchBlogsSaga(action) {
  try {
    const params = action.payload || {};
    const queryString = new URLSearchParams(params).toString();
    const { data } = yield call(api.get, `/blogs?${queryString}`);
    yield put(fetchBlogsSuccess({ blogs: data.blogs, total: data.total }));
  } catch (error) {
    yield put(fetchBlogsFailure(error.response?.data?.message || 'Failed to fetch blogs'));
  }
}

function* fetchBlogSaga(action) {
  try {
    const { data } = yield call(api.get, `/blogs/${action.payload}`);
    yield put(fetchBlogSuccess(data.blog));
  } catch (error) {
    yield put(fetchBlogsFailure(error.response?.data?.message || 'Failed to fetch blog'));
  }
}

export default function* blogSaga() {
  yield takeLatest(fetchBlogsRequest.type, fetchBlogsSaga);
  yield takeLatest(fetchBlog.type, fetchBlogSaga);
}
