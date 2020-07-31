const express = require('express');
const passport = require('passport');
const router = express.Router();
const Movie = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
  let list = null;
  // Used to populate the DB from the API call
  // Movie.populateDb()
  if (!req.user) {
    res.render('index', {
      list: list,
      user: req.user,
      name: req.query.name,
    });
  } else {
    res.redirect('movies')

  }
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

// Dashboard
router.get('/dashboard', function(req, res, next) {
  let query = []
  req.user.watched.forEach(w => {
    query.push(w.toString())
  })
  Movie.find({
    movieId: {
      $in: query
    }
  }, function(err, watched) {
    res.render('dashboard', {
      watched: watched,
      user: req.user,
    })
  })
})

// About Page
router.get('/about', (req, res, next) => {
  res.render('about', {
    user: req.user
  })
})
module.exports = router;