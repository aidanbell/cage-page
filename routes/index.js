const express = require('express');
const request = require('request');
const passport = require('passport');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;


/* GET home page. */
router.get('/', function(req, res, next) {
  let list = null;
  res.render('index', {
    list: list,
    user: req.user,
    name: req.query.name,
  });
});

router.post('/', (req, res, next) => {
  let options = {
    url: rootURL
  };
  request(options, (err, response, body) => {
    let list = JSON.parse(body);
    res.render('index', {
      list: list,
      user: req.user,
      name: req.query.name
    });
  })
});

router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id;
  const castOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`
  });
  const movieOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${token}&language=en-US`
  });


  Promise.all([castOps, movieOps]).then(([castDetails, movieDetails]) => {
      res.render('show', {
        castDetails,
        movieDetails,
        id,
        user: req.user,
        name: req.query.name
      })
    })
    .catch(err => console.log(err));
});

router.get('/auth/google', passport.authenticate(
  'google', {
    scope: ['profile', 'email']
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google', {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
