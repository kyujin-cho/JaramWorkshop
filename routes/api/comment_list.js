var express = require('express');
var router = express.Router();
var db = require('sqlite');

Promise.resolve()
.then(() => {
    db.open('../../db.sqlite', {Promise})
})
.catch(err => console.error(err.stack))



router.get('/posts/:postid/comments/:id', function(req, res, next) {
    var response_data = {}
    db.all("SELECT * FROM COMMENTS WHERE _id=" + req.params.id)
        .then(post => {
            response_data['title'] = post['title']
            response_data['contents'] = post['contents']
            response_data['name'] = post['name']
            response_data['date'] = post['date']
        res.json(response_data)
    })
});

router.post('/posts/:postid/comments/:id', function(req, res, next) {
    var ppt = db.prepare("INSERT INTO COMMENTS (name, contents, pw) VALUES(?,?,?)");
    ppt.exec(req.body.name, req.body.contents, req.body.pw);
})



module.exports = router;