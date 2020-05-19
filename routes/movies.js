const express = require('express');
const request = require('request');
const passport = require('passport');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const Movie = require('../models/movie');
const User = require('../models/user');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;



router.get('/my-list', (req, res, next) => {
  console.log(req.user);
  res.render('my-list', {
    user: req.user,
    name: req.query.name
  });
});

router.get('/search/?', async (req, res, next) => {
  let results = await Movie.findOne({
    title: req.query.title
  })
  if (results) {
    res.redirect(`/movies/${results.movieId}`)
  } else {
    results = await Movie.fuzzySearch(req.query.title);
    console.log(req.query)
    res.render('results', {
      list: results,
      user: req.user,
      user: req.user.name
    })
  }
})

router.get('/', (req, res, next) => {
  Movie.find({}, (err, list) => {
    res.render('movies', {
      movie: Movie,
      list: list,
      user: req.user,
      name: req.query.name
    });
  })
  // let options = {
  //   url: rootURL
  // };
  // request(options, (err, response, body) => {
  // });
});

router.get('/:id', (req, res, next) => {
  console.log('hit');
  const id = req.params.id;
  const castOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`
  });
  const movieOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${token}&language=en-US`
  });


  Promise.all([castOps, movieOps]).then(([castDetails, movieDetails]) => {
      Movie.findOne({
        movieId: movieDetails.id
      }, (err, movie) => {
        res.render('show', {
          movie,
          castDetails,
          movieDetails,
          id,
          user: req.user,
          name: req.query.name
        })
      })
    })
    .catch(err => console.log(err));
});

router.post('/:id', (req, res, next) => {
  User.findById(req.user.id, function(err, user) {
    user.watched.push(req.params.id)
    user.save(function(err) {
      res.redirect(`/movies/${req.params.id}`)
    })
  })
})

module.exports = router;