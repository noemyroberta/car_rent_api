const express = require('express');
const app = express();

app.use('/status',(request, response, next) => {
    response.status(200).send({
        mensagem: "OK",
    });
}); 

module.exports = app;