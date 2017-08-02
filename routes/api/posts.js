var express = require('express');
var router = express.Router();
var db = require('sqlite')

Promise.resolve()
.then(()=> {
    db.open('../../db.sqlite', {Promise})
})
.catch(err => console.error(err.stack))

/* GET home page. */
router.get('/posts/: id', function(req, res, next) {
  var response_data = {}
  db.get("SELECT * FROM POSTS WHERE _id=" + req.param.id)
  .then(post => {
    response_data['title'] = post['title']
    response_data['contents'] = post['contents']
    reponse_data['name'] = post['name']
    reponse_data['date'] = post['date']
    res.json(response_data)
  })
});

router.put('/posts/:id', function(req, res, next) {
  db.get("SELECT * FROM POSTS WHERE _id=" + req.params.id)
  .then(post => {
    if(post.password === req.body.password)
      return db.exec("UPDATE FROM POSTS WHERE _id=" + req.params.id + "SET title=" + req.body.title + ", contents=" + req.body.contents)
    else
      throw new Error("Invalid Password")
  })
  .then(() => {
    res.json({success: true})
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    })
  })
})

router.delete('/posts/:id', function(req, res, next) {
  db.get("SELECT * FROM POSTS WHERE _id=" + req.params.id)
  .then(post => {
    if(post.password === req.body.password)
      return db.exec("DELETE FROM POSTS WHERE _id=" + req.params.id)
    else
      throw new Error("Invalid Password")
  })
  .then(() => {
    res.json({success: true})
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    })
  })
})

module.exports = router;
