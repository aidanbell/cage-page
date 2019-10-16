var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ruleSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 }
  },
  {
    timestamps: true
  }
);

var watchedSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    movieId: {
      type: String,
      required: true
      }
    },
    poster_path: {
      type: String,
      required: true
    },
    watched: {
      default: true
    },
    rules: [ruleSchema],
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Watched', watchedSchema);
