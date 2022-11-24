const { ShortUrl } = require('../database/shortUrl');

async function homeClickController(req, res) {
  try {
    const Url = await ShortUrl.findOne({ short: req.params.id });

    Url.clicks += 1;
    Url.save();
    res.redirect(Url.full);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function homeController(req, res) {
  try {
    const shortUrls = await ShortUrl.find();
    res.status(200).json(shortUrls);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { homeClickController, homeController };
