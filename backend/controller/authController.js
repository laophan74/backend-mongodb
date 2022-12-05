const bcrypt = require('bcryptjs');
const { Account } = require('../database/shortUrl');

async function logOutController(req, res) {
  res.send('Logged out');
}

async function logInController(req, res) {
  try {
    const u = await Account.findOne({ username: req.body.username });
    const isMatch = await bcrypt.compare(req.body.password, u.password);
    if (u) {
      if (isMatch) {
        res.status(200).json({ errorCode: 0, username: u.username });
      } else {
        res.status(401).json({ errorCode: 1, message: 'Sai password' });
      }
    } else {
      res.status(401).json({ errorCode: 1, message: 'Sai username' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function signUpController(req, res) {
  try {
    if (!req.body.username) {
      res.status(401).json({ errorCode: 1, message: 'Undefined Username' });
    } else if (!req.body.password) {
      res.status(401).json({ errorCode: 1, message: 'Undefined Password' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const u = await Account.create({
        username: req.body.username,
        password: hashedPassword,
      });
      res.status(200).json({ errorCode: 0, username: u.username });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { logOutController, logInController, signUpController };
