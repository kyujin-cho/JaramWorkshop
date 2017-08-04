var express = require('express');
var router = express.Router();
var db = require('sqlite')

Promise.resolve()
.then(()=> {
  db.open('../../db.sqlite', {Promise})
})
.catch(err => console.error(err.stack))

router.post('/', function(req, res, next) {
  db.exec("INSERT INTO COMMENTS(contents, name, pw, post_id, date) VALUES('" +
    req.body.contents + "', '" + req.body.name + "', '" + 
    req.body.password + "', " + req.body.post_id + ", '" + new Date() + "');"
  )
  .then(() => {
    res.json({success: true})
  })  
})

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var response_data = {}
  db.get("SELECT * FROM COMMENTS WHERE _id=" + req.params.id)
  .then(comments => { 
    if(comments !== undefined) {
      console.log('11')
      response_data['contents'] = comments['contents']
      reponse_data['name'] = comments['name']
      reponse_data['date'] = comments['date']
    }
    res.json(response_data)
  })
});

router.put('/:id', function(req, res, next) {
  db.get("SELECT * FROM COMMENTS WHERE _id=" + req.params.id)
  .then(comment => {
    if(comment.password === req.body.password)
      return db.exec("UPDATE FROM COMMENTS WHERE _id=" + req.params.id + " SET contents=" + req.body.contents)
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
  db.get("SELECT * FROM COMMENTS WHERE _id=" + req.params.id)
  .then(comment => {
    if(comment.password === req.body.password)
      return db.exec("DELETE FROM COMMENTS WHERE _id=" + req.params.id)
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
