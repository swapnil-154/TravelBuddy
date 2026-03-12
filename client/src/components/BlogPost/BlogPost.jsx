import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelpers';
import { truncateText } from '../../utils/formatters';
import './BlogPost.css';

const BlogPost = ({ blog, compact = false }) => {
  return (
    <div className={`blog-post-card card-hover ${compact ? 'blog-compact' : ''}`}>
      <div className="blog-image-wrapper">
        <img
          src={blog.coverImage || 'https://via.placeholder.com/800x400'}
          alt={blog.title}
          className="blog-image"
        />
        <div className="blog-overlay">
          {blog.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="blog-tag">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="blog-card-body">
        <div className="blog-meta">
          <div className="blog-author">
            <div className="author-avatar">
              {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span>{blog.author?.name || 'Anonymous'}</span>
          </div>
          <div className="blog-info">
            <span><i className="fas fa-clock me-1"></i>{blog.readTime} min read</span>
            <span><i className="fas fa-eye me-1"></i>{blog.views}</span>
          </div>
        </div>

        <h4 className="blog-title">
          <Link to={`/blog/${blog._id}`}>{compact ? truncateText(blog.title, 60) : blog.title}</Link>
        </h4>

        {!compact && (
          <p className="blog-excerpt">{truncateText(blog.content?.replace(/<[^>]+>/g, '') || '', 120)}</p>
        )}

        <div className="blog-footer">
          <span className="blog-date">
            <i className="fas fa-calendar me-1"></i>
            {formatDate(blog.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="blog-stats">
            <span>
              <i className="fas fa-heart me-1"></i>{blog.likes?.length || 0}
            </span>
            <span>
              <i className="fas fa-comment me-1"></i>{blog.comments?.length || 0}
            </span>
          </div>
          <Link to={`/blog/${blog._id}`} className="read-more-btn">
            Read More <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
