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
      // await ShortUrl.deleteOne({ _id: req.body._id });
      const user = await Account.findOne({ urls: req.body._id });
      const index = user.urls.indexOf(req.body._id);
      const urls = user.urls[0];
      // const result = await Account.updateOne(
      //   { _id: user._id },
      //   { urls },
      // );
      res.send(`${index}`);
      // res.status(201).json(_id);
    }
  } catch (error) {
    res.status(500).json('Failed');
  }
  // res.redirect('http://localhost:3000/');
}

module.exports = { shortUrlsController, deleteUrlsController };
