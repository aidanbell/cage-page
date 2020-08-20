const Movie = require('../models/movie');


const create = (req, res, next) => {
  console.log('create')
  Movie.findOne({ movieId: req.params.id}, function(err, movie) {
    movie.rules.push(req.body);
    movie.save(function(err) {
      if (err) return res.redirect(`/movies/${req.params.id}`)
      res.redirect(`/movies/${req.params.id}`)
    });
  });
};

let toast = (req, res, next) => {
  Movie.findOne({ movieId: req.params.mId }, function (err, movie) {
    let rule = movie.rules.id(req.params.rId)
    console.log(rule)
    if (rule.toasts.indexOf(req.user.id)) {
      rule.toasts.push(req.user.id)
    } else {
      console.log("already toasted")
    }
    movie.save(function (err) {
      if (err) return (err)
      res.redirect(`/movies/${req.params.mId}`)
    })
  })
}


module.exports = { 
  create,
  toast
 }
