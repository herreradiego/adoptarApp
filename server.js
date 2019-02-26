const express = require('express')
const app = express()
var cors = require('cors')



const  passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy({
    clientID: '802244726801754',
    clientSecret: '7fdbab3647b7d8df754d14e0c2f0024b',
    callbackURL: "http://localhost:3008/auth/facebook/callback",
    profileFields: ['id', 'displayName',  'email','picture.type(large)']
  },
  function(accessToken, refreshToken, profile, cb) {
    /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
    return cb(null, profile)
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.


// Configure view engine to render EJS templates.
app.set('views', __dirname + 'views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());







// Define routes.
app.get('/',
  function(req, res) {
    res.send("Welcome to server")
  })

app.get('/login',
  function(req, res){
    res.send('pantalla de login');
  });

app.get('/auth/facebook/',cors(),
passport.authenticate('facebook', { scope: ['email']}),
function(req, res){
});
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("mono esto:",res)
    res.json(req.user._json)
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log("mono esto:",JSON.stringify(res))
    res.render('profile', { user: req.user });
  });
     app.listen(3008, function () {
   console.log('Runing on PORT: 3008!');
   
     });
     