const express = require('express');
const router = express.Router();

const ok = {mensagem: "OK"};

router.get('/status', (_, response, _) => {
    response.status(200).send(ok);
});

module.exports = router;