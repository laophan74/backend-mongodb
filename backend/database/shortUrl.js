const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = mongoose.Schema({
  full: {
    type: String,
  },
  short: {
    type: String,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  urls: [{ type: mongoose.Types.ObjectId, ref: 'ShortUrl' }],
});

const Account = mongoose.model('Account', accountSchema);
const ShortUrl = mongoose.model('ShortUrl', urlSchema);

module.exports = { Account, ShortUrl };
