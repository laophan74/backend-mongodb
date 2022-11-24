const { Account } = require('../database/shortUrl');

async function logOutController(req, res) {
  res.send('Logged out');
}

async function logInController(req, res) {
  try {
    const u = await Account.findOne({ username: req.body.username });
    if (u.username) {
      if (u.password === req.body.password) {
        res.status(200).json({ errorCode: 0, username: u.username, password: u.password });
      } else {
        res.status(401).json({ errorCode: 1, message: 'Sai password' });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { logOutController, logInController };
