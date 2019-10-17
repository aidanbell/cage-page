const Movie = require('../models/movie');


const create = (req, res, next) => {
  Movie.findOne({ movieId: req.params.id}, function(err, movie) {
    movie.rules.push(req.body);
    movie.save(function(err) {
      console.log(movie.rules);
      res.redirect(`/movies/${req.params.id}`)
    });
  });
};


module.exports = { create }
