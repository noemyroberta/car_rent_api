const express = require('express');
const serverUrl = require('./utils/server_url');
const router = express.Router();

const ok = {mensagem: "OK"};

router.get('/status', (_, response, __) => {
    response.status(200).send(ok);
});

router.get('/', (_, response, __) => {
    response.status(200).send(ok);
});

module.exports = router;