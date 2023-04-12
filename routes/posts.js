var express = require('express');
var router = express.Router();
const PostControllers = require('../controllers/posts');
const handleErrorAsync = require('../service/handleErrorAsync')

/* GET home page. */
router.get('/', handleErrorAsync(PostControllers.getPosts));
router.post('/', handleErrorAsync(PostControllers.createPosts));
router.delete('/', handleErrorAsync(PostControllers.deletePosts));
router.delete('/:id', handleErrorAsync(PostControllers.deletePost));
router.patch('/:id', handleErrorAsync(PostControllers.editPost));

module.exports = router;
