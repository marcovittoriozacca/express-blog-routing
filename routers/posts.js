const express = require('express');
const router = express.Router();
//posts controller
const posts = require('../controllers/posts.js');

//default route for posts
router.get('/', posts.index);

router.get('/:slug', posts.show);

router.post('/create', posts.create);

router.get('/:slug/download', posts.download);


module.exports = router;