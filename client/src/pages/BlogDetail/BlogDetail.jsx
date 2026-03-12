import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogSuccess } from '../../redux/slices/blogSlice';
import { formatDate } from '../../utils/dateHelpers';
import Loading from '../../components/Loading/Loading';
import api from '../../services/api';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    api.get(`/blogs/${id}`).then(({ data }) => {
      dispatch(fetchBlogSuccess(data.blog));
      setLiked(data.blog.likes?.includes(user?._id));
    });
  }, [id, dispatch, user]);

  const handleLike = async () => {
    if (!user) return;
    const { data } = await api.post(`/blogs/${id}/like`);
    setLiked(data.liked);
    dispatch({ type: 'blogs/updateBlogLikes', payload: { likes: Array(data.likes).fill(user._id) } });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;
    await api.post(`/blogs/${id}/comment`, { text: comment });
    setComment('');
    const { data } = await api.get(`/blogs/${id}`);
    dispatch(fetchBlogSuccess(data.blog));
  };

  if (loading || !blog) return <Loading fullScreen text="Loading story..." />;

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-hero" style={{ backgroundImage: `url(${blog.coverImage})` }}>
        <div className="blog-hero-overlay">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/blog">Blog</Link></li>
                <li className="breadcrumb-item active">Story</li>
              </ol>
            </nav>
            <div className="blog-detail-tags">
              {blog.tags?.map((tag) => <span key={tag} className="blog-hero-tag">#{tag}</span>)}
            </div>
            <h1 className="blog-detail-title">{blog.title}</h1>
            <div className="blog-detail-meta">
              <div className="author-info">
                <div className="author-av">{blog.author?.name?.charAt(0)}</div>
                <span>{blog.author?.name}</span>
              </div>
              <span><i className="fas fa-calendar me-1"></i>{formatDate(blog.createdAt)}</span>
              <span><i className="fas fa-clock me-1"></i>{blog.readTime} min read</span>
              <span><i className="fas fa-eye me-1"></i>{blog.views} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="blog-content">{blog.content}</div>

            <div className="blog-actions-bar">
              <button
                className={`action-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <i className={`${liked ? 'fas' : 'far'} fa-heart me-2`}></i>
                {blog.likes?.length || 0} Likes
              </button>
              <span className="text-muted">
                <i className="fas fa-comment me-1"></i>{blog.comments?.length || 0} Comments
              </span>
            </div>

            {/* Comments */}
            <div className="comments-section">
              <h4>Comments ({blog.comments?.length || 0})</h4>
              {user && (
                <form onSubmit={handleComment} className="comment-form">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit" className="btn btn-comment mt-2">
                    <i className="fas fa-paper-plane me-2"></i>Post Comment
                  </button>
                </form>
              )}
              {blog.comments?.map((c, i) => (
                <div key={i} className="comment-item">
                  <div className="comment-av">{c.user?.name?.charAt(0) || 'U'}</div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <strong>{c.user?.name || 'Anonymous'}</strong>
                      <small>{formatDate(c.date, { month: 'short', day: 'numeric' })}</small>
                    </div>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="blog-sidebar-sticky">
              <div className="author-card">
                <div className="author-card-av">{blog.author?.name?.charAt(0)}</div>
                <h5>{blog.author?.name}</h5>
                <p>Travel Writer</p>
              </div>
              {blog.destination && (
                <div className="related-dest">
                  <h6>📍 Destination</h6>
                  <Link to={`/destinations/${blog.destination._id || blog.destination}`}>
                    {blog.destinationName}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
