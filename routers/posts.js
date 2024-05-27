const express = require('express');
const router = express.Router();
//posts controller
const posts = require('../controllers/posts.js');

//default route for posts
router.get('/', posts.index);


module.exports = router;