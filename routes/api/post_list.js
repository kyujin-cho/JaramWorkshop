var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/posts', function(req, res, next) {
  var data = '' // data : DB에서 가져온 데이터
  res.json(data)
});

router.post('/posts', function(req, res, next) {
  
})

module.exports = router;
