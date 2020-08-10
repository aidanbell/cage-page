const request = require('request');
const Movie = require('../models/movie');
const User = require('../models/user');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;

let detailsCall = (options) => {
  return new Promise ((resolve, reject) => {
    request(options, (err, res, body) => {
      if(!err && res.statusCode == 200) {
        resolve(JSON.parse(body));
      };
      reject(err);
    });
  });
};

let getAll = (req, res, next) => {
  Movie.find({}, (err, list) => {
    res.render('movies', {
      movie: Movie,
      list: list,
      user: req.user,
      name: req.query.name
    });
  })
};

let show = (req, res, next) => {
  const id = req.params.id;
  const castOps = detailsCall({
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`
  });
  const movieOps = detailsCall({
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
};

let addToWatched = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    user.watched.push(req.params.id)
    user.save(function (err) {
      res.redirect(`/movies/${req.params.id}`)
    })
  })
}

let search = async (req, res, next) => {
  let results = await Movie.findOne({
    title: req.query.title
  })
  if (results) {
    res.redirect(`/movies/${results.movieId}`)
  } else {
    results = await Movie.fuzzySearch(req.query.title);
    res.render('results', {
      list: results,
      user: req.user,
      name: req.user.name
    })
  }
}



module.exports = { 
  detailsCall,
  getAll,
  show,
  addToWatched,
  search
};
