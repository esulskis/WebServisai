var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

email:{
  type: String,
  required: true
  },
password:{
  type: String,
  required: true

},
isLecturer:{
  type: Boolean,
  required: true
},
firstName:{
  type:String,
  required: true
},
lastName:{
  type:String,
  required: true
}

});
var user = module.exports = mongoose.model('users',userSchema);


module.exports.getUserMatch = function(email,password,callback){
  user.findOne({email:email,password:password},function(err,match){

  if (err){

  }

        callback && callback(match);

    });


}
