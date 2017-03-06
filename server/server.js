'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path')

var app = module.exports = loopback();

// passport configurators  -  MUST BEFORE boot
var loopbackPassport = require('loopback-component-passport');

app.enable('trust proxy');
app.set('view engine', 'ejs');

if('production' === process.env.NODE_ENV) {
  app.set('views', path.resolve(__dirname, '../dist/views'));
} else {
  app.set('views', path.resolve(__dirname, '../views'));

  //add vue webpack if not production mode
  require('../build/dev-loopback');
}


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }

  var passportLoader = require('./passport-loader');
  passportLoader.setup(app, loopbackPassport);

});
