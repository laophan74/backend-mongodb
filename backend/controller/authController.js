const bcrypt = require('bcryptjs');
const { Account } = require('../database/shortUrl');

async function logOutController(req, res) {
  res.clearCookie('user').json('Success');
}

async function logInController(req, res) {
  try {
    const user = await Account.findOne({ username: req.body.username });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!user) res.status(401).json({ message: 'Undefined user' });
    if (!isMatch) res.status(401).json({ message: 'Undefined password' });
    res.cookie('user', user.username);
    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function signUpController(req, res) {
  try {
    if (!req.body.username) res.status(401).json({ message: 'Undefined Username' });
    if (!req.body.password) res.status(401).json({ message: 'Undefined Password' });
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await Account.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { logOutController, logInController, signUpController };
