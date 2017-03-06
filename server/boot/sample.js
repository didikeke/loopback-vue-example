'use strict';

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(server) {

  var router = server.loopback.Router();

  //without login
  router.get('/status', server.loopback.status());

  //with login
  router.get('/sample', ensureLoggedIn('/login'), function(req, res, next){
    res.status(200).send('sample');
  });

  server.middleware('routes', router);
};
