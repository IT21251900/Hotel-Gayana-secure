// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const express = require('express');
// const User = require('../models/users.model');

// const router = express.Router();
// require('dotenv').config();

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "3797704980470064",
//       clientSecret: "6eeaaebd17c288da5a7a32fd23a35b55",
//       callbackURL: "https://hotel-gayana-secure.vercel.app/auth/facebook/callback",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       const user = await User.findOne({
//         accountId: profile.id,
//         provider: 'facebook',
//       });
//       if (!user) {
//         console.log('Adding new facebook user to DB..');
//         const user = new User({
//           accountId: profile.id,
//           name: profile.displayName,
//           email: profile.emails && profile.emails[0].value,
//         });
//         await user.save();
//         console.log(user);
//         return cb(null, profile);
//       } else {
//         console.log('Facebook User already exist in DB..');
//         console.log(profile);
//         return cb(null, profile);
//       }
//     }
//   )
// );

// router.get('/', passport.authenticate('facebook', { scope: 'email' }));

// router.get(
//   '/callback',
//   passport.authenticate('facebook', {
//     failureRedirect: '/auth/facebook/error',
//   }),
//   function (req, res) {
//     // Successful authentication, redirect to success screen.
//     res.redirect('/auth/facebook/success');
//   }
// );

// router.get('/success', async (req, res) => {
//   const userInfo = {
//     id: req.session.passport.user.id,
//     displayName: req.session.passport.user.displayName,
//     provider: req.session.passport.user.provider,
//   };
//   res.render('fb-github-success', { user: userInfo });
// });

// router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

// router.get('/signout', (req, res) => {
//   try {
//     req.session.destroy(function (err) {
//       console.log('session destroyed.');
//     });
//     res.render('auth');
//   } catch (err) {
//     res.status(400).send({ message: 'Failed to sign out fb user' });
//   }
// });

// module.exports = router;

const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

FACEBOOK_APP_ID = "3797704980470064";
FACEBOOK_APP_SECRET = "6eeaaebd17c288da5a7a32fd23a35b55";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "https://hotel-gayana-secure.vercel.app/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});