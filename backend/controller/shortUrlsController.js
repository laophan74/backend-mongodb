const { ShortUrl, Account } = require('../database/shortUrl');

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
    if (req.body._id) {
      const dUrl = await ShortUrl.findOneAndDelete({ _id: req.body._id });
      const user = await Account.findOne({ urls: req.body._id });
      if (user) {
        const index = user.urls.indexOf(req.body._id);
        user.urls.splice(index, 1);
        const result = await Account.updateOne(
          { _id: user._id },
          { urls: user.urls },
        );
        res.status(200).json(result);
      } else res.status(200).json(dUrl);
    }
  } catch (error) {
    res.status(500).json('Failed');
  }
  // res.redirect('http://localhost:3000/');
}

module.exports = { shortUrlsController, deleteUrlsController };
