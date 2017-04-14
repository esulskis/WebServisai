var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var app = express();
user = require('../models/user');
mongoose.connect('mongodb://localhost/eschool');
app.use(bodyParser.json());
app.use(expressValidator());


var db = mongoose.connection;




app.post('/api/register',function(req,res){


  req.checkBody('email','Įvestas netesingas el. paštas').notEmpty().isEmail();
  req.checkBody('password','Slaptažodis turi būti bent 6 simboliu').notEmpty().len(6,30);
  req.checkBody('isLecturer','Must be boolean type').notEmpty().isBoolean();
  req.checkBody('name','Neivestas vardas').notEmpty();

var userData= {
   email:req.body.email,
   password: req.body.password,
  isLecturer: req.body.isLecturer,
   name: req.body.name

}
var error = req.validationErrors();
if(error){
  res.json(error);
}else{
  user.checkIfEmailExists(req.body.email,function(match){

    if(match){
      res.json("Toks el. paštas jau priregistruotas");
    }else{user.addUser(userData,function(err){
    if(err){
      throw err;
    }
    res.json("Vartotojas sukurtas");
    });}
  });

}
});

app.put('/api/changePassword',function(req,res){
req.checkBody('newPassword','Naujas slaptažodis turi būti bent 6 simboliu').notEmpty().len(6,30);
req.checkBody('oldPassword','Neivestas senas slaptažodis').notEmpty().len(6,30);
var error = req.validationErrors();
if(error){
  res.json(error);
}else{
  var userData= {
   password: req.body.newPassword,
   oldPassword: req.body.oldPassword,
   email: req.body.email
}
  user.getUserMatch(userData.email,userData.oldPassword,function(match,callback){

  if (match) {


user.changePassword(userData,function(err){
  if(err){
    throw err;
  }
  res.json("Slaptažodis pakeistas");
});}else{
  res.json("Neteisingas senas slaptažodis");}
});}
});

app.put('/api/changeName/:_id',function(req,res){
    req.checkBody('newName','Neteisingai įvestas vardas').notEmpty().len(1,30);
    var error = req.validationErrors();
    if(error){
      res.json(error);
    }else{
var id = req.params._id;
var userData= {
   name: req.body.newName
}
user.changeName(id,userData,function(err){
  if(err){
    throw err;
  }
  res.json("Vardas pakeistas");
});}
});

app.listen(83);
console.log('Running on port 83');
