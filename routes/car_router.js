const express = require('express');
const carUrl = require('./utils/car_url');
const router = express.Router();
const CarRepository = require('../db/repositories/car_repository');

const repository = new CarRepository();

router.get(carUrl.GET_ALL, async (_, response, __) => {
    const cars = await repository.getAll();
    response.status(200).json({cars: cars});
});

module.exports = router;