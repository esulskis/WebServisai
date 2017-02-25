

module.exports.index = function(req, res){
res.render('index', { title: 'Index',user:req.session.user });
};

module.exports.login = function(req, res){
  if(req.session.user){
    res.redirect('/');
  }
res.render('login', { title: "Login" });
};

module.exports.logout = function(req, res){
  if(req.session.user)
    req.session.destroy();
res.redirect('/');
};
