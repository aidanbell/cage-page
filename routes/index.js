const express = require('express');
const request = require('request');
const passport = require('passport');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

const token = process.env.API_KEY;
let id;
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
  let options = {url: rootURL};
  request(options, (err, response, body) => {
    let list = JSON.parse(body);
    res.render('index', {
      list: list,
      user: req.user,
      name: req.query.name
    });
  })
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let castDetails;
  let movieDetails;
  let castOps = moviesCtrl.detailsCall({url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`});
  let movieOps = moviesCtrl.detailsCall({ url: `https://api.themoviedb.org/3/movie/${id}?api_key=${token}&language=en-US`});

  Promise.all([castOps, movieOps]).then(
    ([castDetails, movieDetails]) => {

      return res.render('show', {
          movieDetails,
          castDetails,
          id: req.params.id,
          user: req.user,
          name: req.query.name
        })
  }).catch(err=>console.error(err))
});

router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/users'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
