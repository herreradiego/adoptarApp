
const express = require('express');
const fetch = require("node-fetch");
const fs = require('fs');
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


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*
var passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

*/

/*DB CONFIG*/

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017', function (err) {
 
   if (err) throw err;
 
   
 
}).then((resp)=>{console.log('connected to DB');});
 


let provincias =new Set([])




//FB AUTH //
passport.use(new FacebookStrategy({
  clientID: '406995350060243',
  clientSecret: '635ee32d0d997d42cf0cb9f8a6a055b6',
  callbackURL: "http://localhost:3008/auth/facebook/callback",
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, cb) {

  passport.deserializeUser(function(id, cb){
    User.findOne({ facebookId: profile.id }, function (err, user) {
      console.log("Auth done");
      done(null, profile);
      return cb(err, user);
    });
})
}

))
  

app.get('/',
  function(req, res) {
    res.send("Welcome to server")
  })


app.get('/login',
  function(req, res){
    res.send('pantalla de login');
  });

  app.get('/provincias',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
   
    const respJson = [...provincias]
    
    console.log(respJson)
    res.json(respJson)
  })

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
// END FB AUTH



const initialize = async() =>{
console.log("ARRANCA")
  /*Version fetch*/
   fetch('https://apis.datos.gob.ar/georef/api/provincias').then(resp=>{
   
   return resp.json()
  }).then(data=>{
data.provincias.map(item=>{
  console.log(item.nombre)
  if(provincias.has(item)){
        
  }else{
   
    provincias.add(item)
    //console.log("UNIQUE: ",item.provincia.nombre)

  }
})
    
  })
}

initialize();

/*¡version local file
  return await fs.readFile('./geoData.json', 'utf8', function (err, data) {

    if (err) throw err;
  
    geoData = JSON.parse(data);
    geoData = geoData.datos
    geoData.map(item=>{
      
      if(provincias.has(item.provincia.nombre)){
        
      }else{
       
        provincias.add(item.provincia.nombre)
        //console.log("UNIQUE: ",item.provincia.nombre)

      }
      
    })*/
  






















 
  /*let provs=[]
  const getProvincias = geoData.data.map((item,provs)=>{
    if(provs.findIndex(item.provincia)){
      
    }else{
      provs.push(item.provincia)
      console.log("PROVINCIA UNICA",item.provincia)
    }
  })
   
  
  //const provs = getProvincias(geoData)*/
  //console.log(geoData)

  
  

  
  

  //console.log(geoData)
  












