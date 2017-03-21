
var http = require("http");
var soap = require("soap");
var xml = require('fs').readFileSync('vk_auth/vk_auth.wsdl', 'utf8');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost/eschool');
user =  require('../models/user');
var db = mongoose.connection;


var service = {
   authenticationService: {
        authenticationPort : {
            checkWebTokenOperation: function(token,callback){

                jwt.verify(token["token"],"rndSecret",function(err,decode){

                  if(err){
                    callback({tokenValid:false});
                  }
                    callback({userValid:true});
                })

            },
            authenticationOperation: function (args,callback) {


              user.getUserMatch(args["email"],args["password"],function(match){


                if(!match)
                    callback({userValid:false,token:null});
                else{

                  var token = jwt.sign(match,"rndSecret",{


                  });
                      console.log(token);
                  callback({userValid:true,token:token});
                }


               });



            }
        }
    }
};




var server = http.createServer(function(request, response) {

  response.end("404: Not Found: " + request.url);

});

server.listen(81);
soap.listen(server, '/vk-auth', service, xml);
