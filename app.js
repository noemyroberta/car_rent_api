const express = require('express');
const app = express();
const serverUrl = require('./routes/utils/server_url');
const serverRouter = require('./routes/server_router');

app.use(serverUrl.SERVER, serverRouter); 

module.exports = app;