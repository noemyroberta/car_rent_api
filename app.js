const express = require('express');
const app = express();

app.use((request, response, next) => {
    response.status(200).send({
        mensagem: "OK",
    });
}); 

module.exports = app;