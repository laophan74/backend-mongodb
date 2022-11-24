const express = require('express');
const { createUseUrlController, getUserController } = require('../controller/userController');

const userRoute = express.Router();

userRoute.route('/userUrls').post(createUseUrlController);

userRoute.route('/getUser/:id').get(getUserController);

module.exports = userRoute;
