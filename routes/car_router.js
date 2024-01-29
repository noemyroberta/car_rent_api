const express = require('express');
const carUrl = require('./utils/car_url');
const router = express.Router();
const CarController = require('../db/controllers/car_controller');
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

router.post(
    carUrl.INSERT,
    CarController.validate('insertCar'),
    CarController.insert,
);

module.exports = router;