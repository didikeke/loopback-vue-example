'use strict';

module.exports = function(app) {
  var ds = app.dataSources.db;
  var User = app.models.user;

  var createDefaultUser = function(callback) {
    User.count(function(err, count) {
      if (0 === count) {
        User.create({
          username: 'admin',
          email: 'loopback@didikeke.com',
          password: 'admin',
          emailVerified: true
        }, callback);
      }
    });
  };


  if(ds.connected) {
    ds.autoupdate(function(obj) {
      console.log('autoupdate connected');
      createDefaultUser();
    });
  } else {
    ds.once('connected', function() {
      ds.autoupdate(function(obj) {
        console.log('autoupdate once');
        createDefaultUser();
      });
    });
  }
};
