var express = require('express')
var router = express.Router()

router.get('/posts', function (req, res, next) {
    res.render('posts')
})

router.get('/posts/:id', function (req, res, next) {
    res.render('post')
})

router.get('/write', function (req, res, next) {
    res.render('write')
})

module.exports = router