var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

email:{
  type: String,
  required:true
  },
password:{
  type: String,
  required:true

},
isLecturer:{
  type: String,
  required:true
},
name:{
  type:String,
  required:true
}
});
var user = module.exports = mongoose.model('users',userSchema);


module.exports.getUserMatch = function(email,password,callback){
  user.findOne({email:email,password:password},function(err,match){
  if (err){
  }

        callback && callback(match);
    });}

module.exports.addUser = function(userData,callback){
  user.create(userData,callback);
}

module.exports.checkIfEmailExists = function(email,callback){
  user.findOne({email:email},function(err,match){
    callback && callback(match);
  });
}

module.exports.changePassword = function(userData,callback){
  var query ={email: userData.email};
  var update = {
    password: userData.password
  }
  user.findOneAndUpdate(query,update,callback);
}

module.exports.changeName = function(userId,userData,callback){
  var query={_id: userId};
  var update ={
  name:  userData.name
  }
  user.findOneAndUpdate(query,update,callback);

}

module.exports.getUserRole = function(userId,email,callback){
  user.findOne({_id:userId,email:email},function(err,match){
   console.log(match);


  });
}
