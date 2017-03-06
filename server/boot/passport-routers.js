'use strict';

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(server) {

  var router = server.loopback.Router();

  var createLoggedCookie = function(req, res, user, accessToken) {
    res.cookie('access_token', accessToken.id, {
      signed: req.signedCookies ? true : false,
      maxAge: 1000 * accessToken.ttl
    });
    res.cookie('userId', user.id.toString(), {
      signed: req.signedCookies ? true : false,
      maxAge: 1000 * accessToken.ttl
    });
  };

  router.get('/home/', ensureLoggedIn('/login'), function(req, res, next) {
    if(!req.accessToken){
      return res.redirect('/logout');
    }
    res.render('home', {
      user: req.user
    });
  });

  router.get('/homelocal', ensureLoggedIn('/login'), function(req, res, next) {
     //31556926 is seconds for one year
     req.user.accessTokens.create({ttl: 31556926}, function(err, accessToken) {
       createLoggedCookie(req, res, req.user, accessToken);
       res.redirect('/home/');
     });
  });

  router.get('/logout', function(req, res, next) {
    req.logout();
    res.clearCookie('access_token');
    res.clearCookie('userId');
    res.redirect('/');
  });

  router.get('/', function(req, res, next) {
    if (req.user) {
      res.redirect('/home/');
    } else {
      res.render('index');
    }
  });

  router.get('/login', function(req, res, next) {
    if (req.user) {
      res.redirect('/home/');
    } else {
      res.render('index');
    }
  });

  server.middleware('routes', router);
};
