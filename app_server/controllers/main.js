


module.exports.index = function(req, res){
res.render('index', { title: 'Index' });
};

module.exports.login = function(req, res){
res.render('login', { title: 'Login' });
};
