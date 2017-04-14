
module.exports.index = function(req, res){
if(req.session.user)
res.render('index', { title: 'Index',user:req.session.user["email"] });
else
res.render('index', { title: 'Index' });
};

module.exports.login = function(req, res){


  if(req.session.user)
    res.redirect('/');
    else
res.render('login', { title: "Login" });
};

module.exports.logout = function(req, res){
  if(req.session.user){
    req.session.destroy();
    res.redirect('/login');
  }
    else
res.redirect('/');
};

module.exports.register = function(req,res){
  if(!req.session.user)
  res.render('register',{title: "Register"});
  else
  res.redirect('/');
};
module.exports.name = function(req,res){
  if(req.session.user)
  res.render('name',{user:req.session.user["email"] });
  else
  res.redirect('/login');
};
module.exports.password = function(req, res){
  if(req.session.user)
  res.render('password',{user:req.session.user["email"] });
  else res.redirect('/login');
};
module.exports.profile = function(req, res){
  if(req.session.user)
  res.render('profile',{tittle:"Profile",user:req.session.user["email"] });
  else res.redirect('/login');
};
