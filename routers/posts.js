const express = require('express');
const router = express.Router();
//posts controller
const posts = require('../controllers/posts.js');

//default route for posts
router.get('/', posts.index);

//show route to get the single element
router.get('/:slug', posts.show);

//create route - at the moment its just displays an h1
router.post('/create', posts.create);

//download route to download the single post image
router.get('/:slug/download', posts.download);


module.exports = router;