var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const request = require('request');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;

var ruleSchema = new Schema(
  {
    userName: String,
    content: String
  }, {
    timestamps: true
  });

var movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
    poster_path: {
      type: String,
      required: true
    },
    rules: [ruleSchema]
  }
);


// Used to update Database with minimal movie info
// to limit API calls

movieSchema.static('populateDb', function() {
  request(rootURL, (err, response, body) => {
    let list = JSON.parse(body);
    list.cast.forEach((movie) => {
      let newMovie = this.create({
        title: movie.title,
        movieId: movie.id,
        poster_path: movie.poster_path,
      }, function(err) {
      });
    });
  })
})

module.exports = mongoose.model('Movie', movieSchema);
