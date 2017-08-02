var express = require('express');
var router = express.Router();
var db = require('sqlite')

Promise.resolve()
.then(()=> {
    db.open('../../db.sqlite', {Promise})
})
.catch(err => console.error(err.stack))

/* GET home page. */
router.get('/posts/:postid/comments/:id', function(req, res, next) {
  var response_data = {}
  db.get("SELECT * FROM COMMENTS WHERE _id=" + req.param.id)
  .then(post =>{ 
    response_data['title'] = post['title']
    response_data['contents'] = post['contents']
    reponse_data['name'] = post['name']
    reponse_data['date'] = post['date']
    res.json(response_data)
})
  
});

router.put('/posts/:postid/comments/:id', function(req, res, next) {
  db.exec("UPDATE FROM COMMENTS WHERE _id=" + req.params.id)
})

module.exports = router;
