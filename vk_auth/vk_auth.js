
var http = require("http");
var soap = require("soap");
var xml = require('fs').readFileSync('vk_auth/vk_auth.wsdl', 'utf8');
var userList = [
  {"email":"ts1@email.com", "password":"123"},
{"e-mail":"ts2@email.com","password":"123"}];
var service = {
   authenticationService: {
        authenticationPort : {
            authenticationOperation: function (args) {
              var match = false;
              for(user in userList){
                if (userList[user]["email"] == args["email"] && userList[user]["password"] == args["password"]){
                  match = true;
                }

              }
                return {
                    userValid: match
                }
            }
        }
    }
};




var server = http.createServer(function(request, response) {

  response.end("404: Not Found: " + request.url);

});

server.listen(81);
soap.listen(server, '/vk-auth', service, xml);
