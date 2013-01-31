var express = require('express');
var app = express();
app.set('jsonp callback',true);
app.enable('jsonp callback');

var port = process.env.PORT || 3000;

app.get('/question.js/:questionId/:personId', function(req,res) {
  var questions = [
      'Do you like bacon?'
    , 'Are you going to answer no?'
  ];
  var people = [
      'Chris'
    , 'Jason'
    , 'Don'
    , 'Derek'
    , 'Maciek'
    , 'Jim'
    , 'Alyssa'
    , 'Alex'
    , 'Casey'
  ];

  var questionId = parseInt(req.params.questionId,10);
  var personId = parseInt(req.params.personId,10);

  var js = "";
  if( questionId<questions.length && personId<people.length ) {
    var questionText = people[personId]+', '+questions[questionId];
    js  = "var response = confirm('"+questionText+"');\n";
    js += "$.getJSON('http://blkb-nps.herokuapp.com/answer/questionId/personId/answer?callback=?',function(res){\n";
    js += "console.dir(res);\n";
    js += "alert('Thanks for answering!\\nTotal responses so far: '+res.numAnswered);\n";
    js += "});\n";
  }
  res.header('Content-type', 'text/javascript');
  res.end(js);
});
var numAnswered = 0;
app.get('/answer/:questionId/:personId/:answer', function(req,res) {
  res.jsonp({
    numAnswered: ++numAnswered
  });
});

app.listen(port, function() {
  console.log('listening on port '+port);
});