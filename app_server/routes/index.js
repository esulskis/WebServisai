var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var soap = require('soap');
var url = 'http://localhost:81/vk-auth?wsdl';


router.get('/', ctrlMain.index);
router.get('/login', ctrlMain.login);
router.get('/logout',ctrlMain.logout);


router.post("/login", function(request, response){
  var args = {email:request.body["email"],
      password:request.body["password"]}
      console.log(args["email"]);
soap.createClient(url, function(error, client) {

if(error){
  console.console.log(error);
}
client.authenticationOperation(args, function(err, result) {

    if(result["userValid"]){
      request.session.user = args["email"];
      response.redirect('/');
    }else {

console.log(result["userValid"])

    }

      });
});


});



module.exports = router;
