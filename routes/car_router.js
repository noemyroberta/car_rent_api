const express = require('express');
const carUrl = require('./utils/car_url');
const router = express.Router();
const CarValidator = require('../db/validators/car_validator');
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
    CarValidator.validate('insertCar'),
    CarController.insert,
);

router.get(
    carUrl.GET_BY_ID,
    CarValidator.validate('getCarByUuid'),
    CarController.getByUuid,
);

module.exports = router;