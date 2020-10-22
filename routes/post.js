// Posts routes
const express = require('express')
const {getPosts, createPost, getPost, updatePost, deletePost} = require('../controllers/post')
const { createPostValidator } = require('../validator/post')
const router = express.Router()

router.get('/', getPosts)
router.get('/:_id', getPost)
router.put('/:_id', createPostValidator, updatePost)
router.delete('/:_id',deletePost)
router.post('/', createPostValidator, createPost)

module.exports = router