var express = require('express');
var router = express.Router();

var db = require('sqlite')
Promise.resolve()
.then(() => {
  db.open('../../db.sqlite', {Promise})
})
.catch(err => {console.error(err.stack)})

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM POSTS")
  .then(posts => {
    var response_data = []
    posts.forEach(post => {
      response_data.push({
        title: post['title'],
        name: post['name'],
        _id: post['_id']
      })
    })
    res.json(response_data)
  })
});

router.post('/', function(req, res, next) {
  db.exec("INSERT INTO POSTS(title, contents, name, pw, date) VALUES('" + 
    req.body.title + "', '" + req.body.contents + "', '" +
    req.body.name + "', '" + req.body.password + "', '" + new Date() + "')"
  )
  .then(() => {
    res.json({success: true})
  })
})

router.get('/:id', function(req, res, next) {
  
  db.get("SELECT * FROM POSTS WHERE _id=" + req.params.id)
  .then(post => { 
    var response_data = {}
    if(post !== undefined) {
      console.log('11')
      response_data['id'] = post['_id']
      response_data['title'] = post['title']
      response_data['contents'] = post['contents']
      response_data['name'] = post['name']
      response_data['date'] = post['date']
    }
    res.json(response_data)
  })
});

router.put('/:id', function(req, res, next) {
  db.get("SELECT * FROM POSTS WHERE _id=" + req.params.id)
  .then(comment => {
    if(comment.password === req.body.password)
      return db.exec("UPDATE FROM POSTS WHERE _id=" + req.params.id + " SET title=" + req.body.title + ", contents=" + req.body.contents)
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

router.delete('/:id', function(req, res, next) {
  db.get("SELECT * FROM POSTS WHERE _id=" + req.params.id)
  .then(comment => {
    if(comment.password === req.body.password)
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

router.get('/:id/comments', function(req, res, next) {
  console.log(req.params.id)
  db.all("SELECT * FROM COMMENTS WHERE post_id=" + req.params.id)
  .then(comments => {
    var response_body = []
    comments.forEach(comment => {
      response_body.push({
        contents: comment['contents'],
        name: comment['name'],
        date: comment['date']
      })
    })
    res.json(response_body)
  })
})

module.exports = router;
