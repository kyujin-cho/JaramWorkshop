var express = require('express')
var router = express.Router()
var db = require('sqlite')

Promise.resolve()
.then(() => {
  db.open('../../db.sqlite', {Promise})
})
.catch(err => {console.error(err.stack)})


module.exports = router