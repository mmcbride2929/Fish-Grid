const express = require('express')
const router = express.Router()

const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postControllers')
const authenticateUser = require('../middleware/authenticateUser')

router.route('/').get(getPosts).post(authenticateUser, createPost)
router
  .route('/:id')
  .get(getPost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost)

module.exports = router
