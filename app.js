const express = require('express');
const app = express();
const serverUrl = require('./routes/utils/server_url');
const serverRouter = require('./routes/server_router');
const carUrl = require('./routes/utils/car_url');
const carRouter = require('./routes/car_router');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(expressValidator());

app.use(serverUrl.SERVER, serverRouter);
app.use(carUrl.BASE, carRouter);

module.exports = app;