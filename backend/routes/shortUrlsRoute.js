const express = require('express');
const { shortUrlsController, deleteUrlsController } = require('../controller/shortUrlsController');

const shortUrlsRoute = express.Router();

shortUrlsRoute.route('/shortUrls').post(shortUrlsController);

shortUrlsRoute.route('/deleteUrls').post(deleteUrlsController);

module.exports = shortUrlsRoute;
