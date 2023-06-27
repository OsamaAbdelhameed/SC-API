const express = require('express');
const { createPost, updatePost, changePostState, getAllPosts, deletePost, addComment } = require('../controllers/post');
const { validateSchema, Schemas } = require('../middleware/validate');

const router = express.Router();

router.get('/', getAllPosts)
router.post('/', validateSchema(Schemas.post), createPost)
router.post('/:id/add-comment', validateSchema(Schemas.comment), addComment)
router.put('/:id', updatePost)
router.patch('/:id', changePostState)
router.delete('/:id', deletePost)

module.exports = router;