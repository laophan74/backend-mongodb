/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortUrlsController = require('./controller/shortUrlsController');
const { createUseUrlController, getUserController } = require('./controller/userController');
const { homeClickController, homeController } = require('./controller/homeController');
const { logInController, logOutController } = require('./controller/authController');
const rootRoute = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://laophan74:01639914061@cluster.n9czek3.mongodb.net/?retryWrites=true&w=majority');

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', rootRoute);

app.listen(8000);
