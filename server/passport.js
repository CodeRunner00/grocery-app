const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const db = require('./models/');

// export a function that receives the Express app we will configure for Passport
module.exports = (app) => {
  // these two middlewares are required to make passport work with sessions
  // sessions are optional, but an easy solution to keeping users
  // logged in until they log out.
  app.use(cookieparser());
  app.use(session({
    // this should be changed to something cryptographically secure for production
    secret: 'keyboard cat',
    resave: false,
    // saveUninitialized: false,
    // automatically extends the session age on each request. useful if you want
    // the user's activity to extend their session. If you want an absolute session
    // expiration, set to false
    // rolling: true,
    name: 'grocery.cookie', // don't use the default session cookie name
    // set your options for the session cookie
    cookie: {
      // httpOnly: true,
      // the duration in milliseconds that the cookie is valid
      maxAge: 20 * 60 * 1000, // 20 minutes
      // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
      // domain: 'your.domain.com',
      // recommended you use this setting in production if your site is published using HTTPS
      // secure: true,
    }
  }));

  // Only necessary when using sessions.
  // This tells Passport how or what data to save about a user in the session cookie.
  // It's recommended you only serialize something like a unique username or user ID.
  // I prefer user ID.
  passport.serializeUser((user, done) => {
    done(null, user.dataValues.userId);
  });

  // Only necessary when using sessions.
  // This tells Passport how to turn the user ID we serialize in the session cookie
  // back into the actual User record from our Mongo database.
  // Here, we simply find the user with the matching ID and return that.
  // This will cause the User record to be available on each authenticated request via the req.user property.
  passport.deserializeUser(function (userId, done) {
    db.User.findOne({ where: { userId: userId } })
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });

  // this tells passport to use the "local" strategy, and configures the strategy
  // with a function that will be called when the user tries to authenticate with
  // a username and password. We simply look the user up, hash the password they
  // provided with the salt from the real password, and compare the results. if
  // the original and current hashes are the same, the user entered the correct password.
  passport.use(new LocalStrategy({
		usernameField: 'userId',
		passwordField: 'password'
	}, (username, password, done) => {
    const errorMsg = 'Invalid username or password';
    return db.User.findOne({ where: { userId: username } })
      .then(user => {
        // if no matching user was found...
        if (!user) {
          return done(null, false, { message: errorMsg });
        }

        // call our validate method, which will call done with the user if the
        // passwords match, or false if they don't
        const isMatch = user.dataValues.password === password;
        return done(null, isMatch ? user : false, isMatch ? null : { message: errorMsg });
      })
      .catch(done);
  }));


//   passport.use(new GoogleStrategy({
//     clientID:     "1056256709536-9btq8hmkm56ngdhrl6rl6pdkm3i4c6qa.apps.googleusercontent.com",
//     clientSecret: "SBTaHRagwTqKjCg1YxXv6a-_",
//     callbackURL: "http://localhost:3005/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     return db.User.findOne({ where: { userId: profile.id } })
//       .then(user => {
//         // if no matching user was found...
//         if (!user) {
//           return done(null, false, { message: errorMsg });
//         }

//         // call our validate method, which will call done with the user if the
//         // passwords match, or false if they don't
//         const isMatch = user.dataValues.password === password;
//         return done(null, isMatch ? user : false, isMatch ? null : { message: errorMsg });
//       })
//       .catch(done);
//   }
// ));

  // initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
  app.use(passport.initialize());
  // only required if using sessions. this will add middleware from passport
  // that will serialize/deserialize the user from the session cookie and add
  // them to req.user
  app.use(passport.session());
}