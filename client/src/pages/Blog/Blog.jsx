import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogPost from '../../components/BlogPost/BlogPost';
import Loading from '../../components/Loading/Loading';
import { fetchBlogsRequest } from '../../redux/slices/blogSlice';
import './Blog.css';

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, loading, total } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogsRequest({ limit: 9 }));
  }, [dispatch]);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <h1>✈️ Travel Stories</h1>
          <p>Discover inspiring travel experiences from adventurers around the world</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-9">
            {loading ? (
              <Loading text="Loading stories..." />
            ) : (
              <div className="row g-4">
                {blogs.map((blog) => (
                  <div key={blog._id} className="col-md-6">
                    <BlogPost blog={blog} />
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="col-12 text-center py-5">
                    <i className="fas fa-pen-fancy fa-4x text-muted mb-3"></i>
                    <h4>No blog posts yet</h4>
                    <p className="text-muted">Be the first to share your travel story!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-lg-3">
            <div className="blog-sidebar">
              {user && (
                <div className="write-blog-cta mb-4">
                  <h5>✍️ Share Your Story</h5>
                  <p>Inspire other travelers with your adventures</p>
                  <button className="btn btn-write-blog w-100">
                    <i className="fas fa-pen me-2"></i>Write a Post
                  </button>
                </div>
              )}

              <div className="sidebar-widget">
                <h5 className="widget-title">Popular Tags</h5>
                <div className="tags-cloud">
                  {['adventure', 'travel', 'photography', 'culture', 'food', 'nature', 'backpacking', 'luxury'].map((tag) => (
                    <span key={tag} className="cloud-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
