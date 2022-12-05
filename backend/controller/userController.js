const { Account, ShortUrl } = require('../database/shortUrl');

async function getUserController(req, res) {
  try {
    const user = await Account.findOne({ username: req.params.id }).populate('urls');
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createUseUrlController(req, res) {
  try {
    if (req.body.full) {
      const Url = await ShortUrl.create({ full: req.body.full });
      await Account.updateOne(
        { username: req.body.username },
        { $push: { urls: Url._id } },
      );
      res.status(201).json('Success');
    }
  } catch (error) {
    res.status(500).json('Failed to post');
  }
  // res.redirect('http://localhost:3000/');
}

module.exports = { getUserController, createUseUrlController };
