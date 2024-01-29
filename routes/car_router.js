const express = require('express');
const carUrl = require('./utils/car_url');
const router = express.Router();
const CarRepository = require('../db/repositories/car_repository');

const repository = new CarRepository();

router.get(carUrl.GET_ALL, async (_, response, __) => {
    try {
        const cars = await repository.getAll();
        response.status(200).json({ cars: cars });
    } catch {
        response.status(500).send({ error: 'Server disconnect' });
    }
});

router.post(carUrl.INSERT, async (request, response, __) => {
    try {
        const cars = await repository.getAll();
        response.status(201).json({message: "Car successful created!"});
    } catch {
        response.status(500).send({ error: 'Server disconnect' });
    }
});

module.exports = router;