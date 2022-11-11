const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
  country: String,
  city: String,
  name: String,
  location: {
    coordinates: [],
  },
  students: [
    { year: Number, number: Number },
  ],
});

const University = mongoose.model('University', universitySchema);

module.exports = University;
