const express = require('express');
const { homeClickController, homeController } = require('../controller/homeController');

const homeRoute = express.Router();

homeRoute.route('/:id').get(homeClickController);

homeRoute.route('/').get(homeController);

module.exports = homeRoute;
