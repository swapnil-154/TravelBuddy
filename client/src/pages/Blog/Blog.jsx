import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogPost from '../../components/BlogPost/BlogPost';
import Loading from '../../components/Loading/Loading';
import { fetchBlogsRequest, createBlogSuccess } from '../../redux/slices/blogSlice';
import api from '../../services/api';
import './Blog.css';

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, loading, total } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', coverImage: '', destinationName: '', tags: '', readTime: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogsRequest({ limit: 9 }));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      const { data } = await api.post('/blogs', payload);
      dispatch(createBlogSuccess(data.blog));
      setShowModal(false);
      setForm({ title: '', content: '', coverImage: '', destinationName: '', tags: '', readTime: 5 });
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

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
                  <button className="btn btn-write-blog w-100" onClick={() => setShowModal(true)}>
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

      {/* Write Blog Modal */}
      {showModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowModal(false)}>
          <div className="blog-write-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <h4>✍️ Write a Travel Story</h4>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {submitError && <div className="alert alert-danger">{submitError}</div>}
              <div className="form-group mb-3">
                <label>Title *</label>
                <input className="form-control" placeholder="Give your story a title..." value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group mb-3">
                <label>Cover Image URL</label>
                <input className="form-control" placeholder="https://..." value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-8">
                  <label>Destination</label>
                  <input className="form-control" placeholder="e.g. Bali, Indonesia" value={form.destinationName}
                    onChange={(e) => setForm({ ...form, destinationName: e.target.value })} />
                </div>
                <div className="col-4">
                  <label>Read Time (min)</label>
                  <input type="number" className="form-control" min={1} value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Tags (comma separated)</label>
                <input className="form-control" placeholder="travel, adventure, food" value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <div className="form-group mb-3">
                <label>Story Content *</label>
                <textarea className="form-control" rows={8} placeholder="Share your travel experience..."
                  value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-write-blog w-100" disabled={submitting}>
                {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Publishing...</> : <><i className="fas fa-paper-plane me-2"></i>Publish Story</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
