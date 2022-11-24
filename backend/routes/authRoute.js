const express = require('express');
const { logInController, logOutController } = require('../controller/authController');

const authRoute = express.Router();

authRoute.route('/login').post(logInController);

authRoute.route('/logout').get(logOutController);

module.exports = authRoute;
