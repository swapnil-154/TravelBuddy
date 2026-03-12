const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, tag } = req.query;
    const query = { published: true };
    if (tag) query.tags = tag;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .populate('destination', 'name country')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, count: blogs.length, total, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar')
      .populate('destination', 'name country')
      .populate('comments.user', 'name avatar');

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body, author: req.user.id };
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comment
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user: req.user.id, text: req.body.text } } },
      { new: true }
    ).populate('comments.user', 'name avatar');
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Like/unlike blog
// @route   POST /api/blogs/:id/like
// @access  Private
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    const liked = blog.likes.includes(req.user.id);
    if (liked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      blog.likes.push(req.user.id);
    }
    await blog.save();
    res.json({ success: true, likes: blog.likes.length, liked: !liked });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
