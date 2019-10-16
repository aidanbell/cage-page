const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ruleSchema = new Schema(
  {
    userId: String,
    movieId: String,
    content: String
  }, {
    timestamps: true
});

const userSchema = new Schema(
  {
    name: String,
    googleId: String,
    rules: [ruleSchema]
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
