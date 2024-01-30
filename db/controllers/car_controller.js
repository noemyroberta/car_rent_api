const Car = require('../models/car')
const CarRepository = require('../repositories/car_repository');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const repository = new CarRepository();

const inserted = { message: "Car created successfully!" };
const getted = { message: "Car getted successfully!" };
const gettedAll = { message: "Cars getted successfully!" };
const notFound = { error: "Given car uuid not found" };

exports.insert = async (req, res, next) => {
    verifyError(req, res);

    const { brand, model, year, rentalRate } = req.body;
    const uuid = uuidv4();
    if (brand && model && year && rentalRate) {
        try {
            const newCar = await repository.insert(Car({
                uuid,
                brand,
                model,
                year,
                rentalRate,
            }));
            const jsonResponse = { inserted, car: newCar };
            res.status(201).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}

function verifyError(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
}


exports.getAll = async (_, res, __) => {
    const uuid = req.headers['uuid'];
    console.log(`UUID::: ${uuid}`);

    try {
        const cars = await repository.getAll();
        const jsonResponse = { gettedAll, cars: cars };
        res.status(200).json(jsonResponse);
    } catch (error) {
        return next(error);
    }
}

exports.getByUuid = async (req, res, next) => {
    verifyError(req, res);

    const uuid = req.headers['uuid'];
    console.log(`UUID::: ${uuid}`);
    if (uuid) {
        try {
            const foundCar = await repository.getByUuid(uuid);

            if (!foundCar) {
                res.status(404).json(notFound);
                return;
            }
            const jsonResponse = { getted, car: foundCar };
            res.status(200).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}