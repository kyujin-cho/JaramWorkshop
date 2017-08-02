var express = require('express')
var router = express.Router()
var db = require('sqlite')

Promise.resolve()
.then(() => {
  db.open('../../db.sqlite', {Promise})
})
.catch(err => {console.error(err.stack)})

router.get('/', function(req, res, next) {
  db.all("SELECT * FROM COMMENTS WHERE post_id=" + req.params.id)
  .then(comments => {
    var response_body = []
    comments.forEach(comment => {
      response_body.push({
        contents: comment['title'],
        name: comment['name'],
        date: comment['date']
      })
    })
    res.json(response_body)
  })
})

module.exports = router