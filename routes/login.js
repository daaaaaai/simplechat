var express = require('express');
var router = express.Router();

var username = "";

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/chat', function(req, res) {
  console.log(req.body); 
  if (req.body.username) {
    username = req.body.username;
    console.log('[login] post recieved:' + username); 
  }
  //res.locals.name = username;
  //res.render('chat', { name: username } );
  res.render('chat',{ userdata: {name: username} });

});

module.exports = router;
