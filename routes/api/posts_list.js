var express = require('express');
var router = express.Router();

var db = require('sqlite');

/* GET home page. */


router.get('/posts/:postid', function(req, res, next) {
  var res_data = [];
  db.all("SELECT _id FROM POSTS")
  .then(data => {
    for (var i=0; i<data.length; i++) {
      res_data.push(data[i]);
    }
    res.JSON(res_data);
  });
});


router.post('/posts', function(req, res, next) {
  var req_data = [req.body.title, req.body.contents, req.body.name, req.body.password]

  db.put("INSERT INTO POSTS (title, contents, name, password) VALUES " +
  "("+req_data[0]+","+req_data[1]+","+req_data[2]+","+req_data[3]+")"
  )
  .then(() => {
    res.send('')
  });
});


module.exports = router;
