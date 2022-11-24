const express = require('express');
const shortUrlsController = require('../controller/shortUrlsController');

const shortUrlsRoute = express.Router();

shortUrlsRoute.route('/shortUrls').post(shortUrlsController);

module.exports = shortUrlsRoute;
