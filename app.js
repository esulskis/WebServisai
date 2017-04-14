var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var debug = require('debug')('Express4');
var routes = require('./app_server/routes/index');
var app = express();
var request = require('request-promise');
var soap = require('soap');
var url = 'http://localhost:81/vk-auth?wsdl';
app.set('views', path.join(__dirname, "app_server",'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use(session({secret:"sdddsafa4sdf5",resave:false, saveUninitialized:true}))


app.use('/', routes);


app.post("/register",function(req, res){
        var options = {
            method: 'POST',
            uri: 'http://localhost:83/api/register/',
              body: {
                email:req.body["email"],
                name:req.body["name"],
                password:req.body["password"],
                isLecturer:req.body["role"]
              },
              json: true
            };

    request(options)
      .then(function (parsedBody) {


      res.render('register', { title: 'Register',message:parsedBody});

    })
    .catch(function (err) {

    });

});
app.post("/profile/password",function(req,res){
  var options = {
    method: 'PUT',
      uri: 'http://localhost:83/api/changePassword/',
              body: {
                email:req.session.user["email"],
                oldPassword:req.body["oldPassword"],
                newPassword:req.body["newPassword"]
              },

              json: true
            };

    request(options)
      .then(function (parsedBody) {

   res.render('password', {user:req.session.user["email"],message:parsedBody});

    })
    .catch(function (err) {

    });
});

app.post("/profile/name",function(req, res){

  var options = {
    method: 'PUT',
      uri: 'http://localhost:83/api/changeName/'+req.session.user["id"],
              body: {
                newName:req.body["newName"]
              },

              json: true
            };

    request(options)
      .then(function (parsedBody) {

   res.render('name', {user:req.session.user["email"],message:parsedBody});

    })
    .catch(function (err) {

    });

});
app.post("/login", function(request, response){
  var args = {email:request.body["email"],
      password:request.body["password"]}

soap.createClient(url, function(error, client) {

if(error){
  console.log(error);
}
client.authenticationOperation(args, function(err, result) {
    if(result["userValid"]=="true"){

      request.session.user = result["token"];
      response.redirect('/');
    }
      else response.redirect('/login');
      });
});


});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
