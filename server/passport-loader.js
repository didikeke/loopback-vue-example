var app = require('./server');

var setupPassport = function(app, loopbackPassport) {
  var PassportConfigurator = loopbackPassport.PassportConfigurator;
  var passportConfigurator = new PassportConfigurator(app);
  // attempt to build the providers/passport config
  var config = {};
  try {
    config = require('./providers.json');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }
  passportConfigurator.init();

  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
  });

  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }
};

module.exports.setup = setupPassport;
