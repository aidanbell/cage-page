var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const request = require('request');
const fuzzy = require('mongoose-fuzzy-searching');

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;

var ruleSchema = new Schema({
  userName: String,
  content: String,
  rating: Number
}, {
  timestamps: true
});

var movieSchema = new Schema({
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
});

movieSchema.plugin(fuzzy, {
  fields: [{
    name: 'title',
    minSize: 1
  }]
})
// Used to update Database with minimal movie info
// to limit API calls

movieSchema.static('populateDb', function() {
  request(rootURL, (err, response, body) => {
    let list = JSON.parse(body);
    console.log(list)
    list.cast.forEach((movie) => {
      if (movie.poster_path === null) return;
      let newMovie = this.create({
        title: movie.title,
        movieId: movie.id,
        poster_path: movie.poster_path,
      }, function(err) {});
    });
  })
})

module.exports = mongoose.model('Movie', movieSchema);