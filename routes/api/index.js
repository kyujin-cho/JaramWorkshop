var express = require('express')
var router = express.Router()
var post_list = require('./post_list')
var posts = require('./posts')
var comment_list = require('./comment_list')
var comments = require('./comments')

router.use('/posts', post_list)
// router.use('/posts/:id', posts)
router.use('/posts/:id/comments', comment_list)
router.use('/comments', comments)

module.exports = router