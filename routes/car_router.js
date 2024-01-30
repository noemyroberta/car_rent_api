const express = require('express');
const carUrl = require('./utils/car_url');
const router = express.Router();
const CarValidator = require('../db/validators/car_validator');
const CarController = require('../db/controllers/car_controller');

router.get(
    carUrl.GET_ALL,
    CarValidator.validate('getAll'),
    CarController.getAll,
);

router.post(
    carUrl.INSERT,
    CarValidator.validate('insertCar'),
    CarController.insert,
);

router.get(
    carUrl.GET_BY_UUID,
    CarValidator.validate('getCarByUuid'),
    CarController.getByUuid,
);

module.exports = router;