const { ShortUrl } = require('../database/shortUrl');

async function shortUrlsController(req, res) {
  try {
    if (req.body.full) {
      await ShortUrl.create({ full: req.body.full });
      // res.status(201).json('Success');
    }
  } catch (error) {
    res.status(500).json('Failed');
  }
  res.redirect('http://localhost:3000/');
}

async function deleteUrlsController(req, res) {
  try {
    if (req.body.short) {
      await ShortUrl.deleteOne({ short: req.body.short });
      // res.status(201).json('Success');
    }
  } catch (error) {
    res.status(500).json('Failed');
  }
  res.redirect('http://localhost:3000/');
}

module.exports = { shortUrlsController, deleteUrlsController };
