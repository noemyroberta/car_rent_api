const express = require('express');
const serverUrl = require('utils/server_url');
const router = express.Router();

const ok = {mensagem: "OK"};

router.get(serverUrl.STATUS, (_, response, _) => {
    response.status(200).send(ok);
});

module.exports = router;