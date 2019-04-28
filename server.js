const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require('mongoose');
var User = require('./models/User.model.js')



//db setup la colection se llama users 

mongoose.connect('mongodb://127.0.0.1:27017/adoptarApp',{
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {


  console.log("conectaste capo")
});



let userData = ''

const  passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy({
    clientID: '802244726801754',
    clientSecret: '7fdbab3647b7d8df754d14e0c2f0024b',
    callbackURL: "http://localhost:3008/auth/facebook/callback",
    profileFields: ['id', 'displayName',  'email','picture.type(large)']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({'email':profile.emails[0].value},function(err,user){
      if (err) return cb(err);
      if (user) return cb(null, user);
      else{
        new User({
          userName:profile.displayName,
          email:profile.emails[0].value,
          photo:profile.photos[0].value
        }).save().then((newUser)=>{console.log("New User Saved: ",newUser)
        return cb(null,newUser)  
        })
      }
    })
    

   

    /*User.findOne({'email':profile.email},(err,user)=>{
      if(err) return cb(err)
      if(user) return cb(null, profile)
      else{
        console.log("ENTRO AL ELSE")
     
      
      // set all of the facebook information in our user model
      new User({
        userName:profile.displayName,
        email:profile.emails.value,
        photo:profile.photos[0].value
      }).save().then((newUser)=>{console.log("New User Saved: ",newUser)})
 
    }
      
    })*/

    
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
    res.send("Welcome to Adoptar APP Server")
  })

  app.get('/getusers',(req,res)=>{
    User.find({}).exec(function(err,books){
      if(err){
        console.log(err)
      }else{
        res.json(books)
      }
    })
  
  })

  app.get('/welcome',
  function(req, res) {
    res.send("hello")
  })

  // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/welcome',
                                      failureRedirect: '/login' }));


 app.listen(3008, function () {
   console.log('Runing on PORT: 3008!');
   
     });
     
