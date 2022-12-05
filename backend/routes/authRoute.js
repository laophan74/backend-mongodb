const express = require('express');
const { logInController, logOutController, signUpController } = require('../controller/authController');

const authRoute = express.Router();

authRoute.route('/login').post(logInController);

authRoute.route('/logout').get(logOutController);

authRoute.route('/signup').post(signUpController);

module.exports = authRoute;
