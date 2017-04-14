var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var request = require('request');

router.get('/', ctrlMain.index);
router.get('/login', ctrlMain.login);
router.get('/logout',ctrlMain.logout);
router.get('/register',ctrlMain.register);
router.get('/profile/password',ctrlMain.password);
router.get('/profile/name',ctrlMain.name);
router.get('/profile',ctrlMain.profile);





module.exports = router;
