const express = require('express');
const app = express();
const serverUrl = require('./routes/utils/server_url');
const serverRouter = require('./routes/server_router');
const carUrl = require('./routes/utils/car_url');
const carRouter = require('./routes/car_router');
const customerUrl = require('./routes/utils/customer_url');
const customerRouter = require('./routes/customer_router');
const rentalUrl = require('./routes/utils/rental_url');
const rentalRouter = require('./routes/rental_router');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(serverUrl.SERVER, serverRouter);
app.use(carUrl.BASE, carRouter);
app.use(customerUrl.BASE, customerRouter);
app.use(rentalUrl.BASE, rentalRouter);

module.exports = app;