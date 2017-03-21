var mongoose = require('mongoose');

var lessonSchema = mongoose.Schema({
title:{
  type: String,
  required: true
  },

  descryption:{
    type: String,
    required: true
  },

  difficulity:{
    type: Number,
    required: true,
    min:1,
    max:10
  },
  authorId:{
  type: String,
  required: true
}

});


var lesson = module.exports = mongoose.model('lessons',lessonSchema);

module.exports.getLessons = function(callback,limit){

lesson.find(callback).limit(limit);

}

module.exports.addLesson = function(lessonData,callback){
console.log(lessonData);
  lesson.create(lessonData,callback);

}
