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

router.get('/search/?', (req, res, next) => {
  Movie.findOne({title: req.query.search}, (err, movie) => {
    res.redirect(`/movies/${movie.movieId}`)
  })
})

router.get('/', (req, res, next) => {
  let options = {
    url: rootURL
  };
  request(options, (err, response, body) => {
    let list = JSON.parse(body);
    res.render('movies', {
      list: list,
      user: req.user,
      name: req.query.name
    });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const castOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`
  });
  const movieOps = moviesCtrl.detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${token}&language=en-US`
  });


  Promise.all([castOps, movieOps]).then(([castDetails, movieDetails]) => {
    Movie.findOne({movieId: movieDetails.id}, (err, movie) => {
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
