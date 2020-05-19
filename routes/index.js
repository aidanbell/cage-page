const express = require('express');
const passport = require('passport');
const router = express.Router();
const Movie = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
  let list = null;
  // Used to populate the DB from the API call
  // Movie.populateDb()
  res.render('index', {
    list: list,
    user: req.user,
    name: req.query.name,
  });
});

// Google auth
router.get('/auth/google', passport.authenticate(
  'google', {
    scope: ['profile', 'email']
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {
    user: req.user
  })
})

router.get('/my-list', (req, res, next) => {
  console.log(req.user);
  res.render('my-list', {
    user: req.user,
    name: req.query.name
  });
});
module.exports = router;