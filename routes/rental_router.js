const express = require('express');
const rentalUrl = require('./utils/rental_url');
const router = express.Router();
const RentalValidator = require('../db/validators/rental_validator');
const RentalController = require('../db/controllers/rental_controller');

router.get(
    rentalUrl.GET_ALL,
    RentalValidator.validate('getAll'),
    RentalController.getAll,
);

router.post(
    rentalUrl.RENT,
    RentalValidator.validate('rentCar'),
    RentalController.rent,
);

router.put(
    rentalUrl.HAND_OVER,
    RentalValidator.validate('handOverCar'),
    RentalController.handOver,
);

router.get(
    rentalUrl.GET_BY_PARAM,
    RentalValidator.validate('getAllByParam'),
    RentalController.getAllByParam,
);

module.exports = router;