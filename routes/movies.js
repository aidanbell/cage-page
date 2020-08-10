const express = require('express');
const request = require('request');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const Movie = require('../models/movie');
const User = require('../models/user');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;


router.get('/search/?', moviesCtrl.search);

router.get('/', moviesCtrl.getAll);
router.get('/:id', moviesCtrl.show);

router.post('/:id', moviesCtrl.addToWatched)

router.get('/:mId/:rId', (req, res, next) => {
  console.log(req.params.mId, req.params.rId)
})

module.exports = router;