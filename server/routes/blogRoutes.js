const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/comment', protect, addComment);
router.post('/:id/like', protect, likeBlog);

module.exports = router;
