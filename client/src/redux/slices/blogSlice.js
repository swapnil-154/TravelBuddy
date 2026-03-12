import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { blogs: [], blog: null, loading: false, error: null, total: 0 },
  reducers: {
    fetchBlogsRequest: (state) => { state.loading = true; state.error = null; },
    fetchBlogsSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.total = action.payload.total;
    },
    fetchBlogsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    fetchBlog: (state) => { state.loading = true; state.error = null; state.blog = null; },
    fetchBlogSuccess: (state, action) => { state.loading = false; state.blog = action.payload; },
    createBlogSuccess: (state, action) => { state.blogs.unshift(action.payload); },
    updateBlogSuccess: (state, action) => {
      state.blogs = state.blogs.map((b) => b._id === action.payload._id ? action.payload : b);
      state.blog = action.payload;
    },
    deleteBlogSuccess: (state, action) => {
      state.blogs = state.blogs.filter((b) => b._id !== action.payload);
    },
    updateBlogLikes: (state, action) => {
      if (state.blog) state.blog = { ...state.blog, ...action.payload };
    },
  },
});

export const {
  fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure,
  fetchBlog, fetchBlogSuccess,
  createBlogSuccess, updateBlogSuccess, deleteBlogSuccess, updateBlogLikes,
} = blogSlice.actions;

export default blogSlice.reducer;
