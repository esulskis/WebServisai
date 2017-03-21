var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended:false}));

app.use(bodyParser.json());


lesson = require('../models/lesson');
mongoose.connect('mongodb://localhost/eschool');
var db = mongoose.connection;


app.get('/api/lessons',function(req,res){

lesson.getLessons(function(err,lessons){
  if(err){
    throw err;
  }
  res.json(lessons);

});

});
// nepabaigta
app.post('/api/lessons',function(req,res){

var lessonData = req.body;
console.log(lessonData);
lesson.addLesson(lessonData,function(err,lessonData){

  if(err){
    throw err;

  }

  res.json(lessonData);

});


});
app.listen(82);
console.log('Running on port 82');
