const { ShortUrl } = require('../database/shortUrl');

async function shortUrlsController(req, res) {
  try {
    if (req.body.full) {
      const result = await ShortUrl.create({ full: req.body.full });
      res.status(201).json('Success');
    }
  } catch (error) {
    res.status(500).json('Failed to post');
  }
  res.redirect('http://localhost:3000/');
}

module.exports = shortUrlsController;
