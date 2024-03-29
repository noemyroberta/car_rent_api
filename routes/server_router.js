const express = require('express');
const serverUrl = require('./utils/server_url');
const router = express.Router();

const ok = {status: 'OK'};

router.get(serverUrl.PING, (_, response, __) => {
    response.status(200).send({message: 'pong'});
});

router.get('/', (_, response, __) => {
    response.status(200).send(ok);
});

module.exports = router;