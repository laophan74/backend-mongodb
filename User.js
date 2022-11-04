const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: Boolean,
});

module.exports = mongoose.model('User', userSchema);
