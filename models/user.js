const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name: String,
    googleId: String,
    watched: Array
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
