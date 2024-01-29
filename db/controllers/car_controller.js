const Car = require('../models/car')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const inserted = {message: "Car created successfully!"};

exports.insert = async (req, res, next) => {
    verifyError(req, res);

    const { brand, model, year, rentalRate } = req.body;
    const uuid = uuidv4();
    if (brand && model && year && rentalRate) {
        try {
            const newCar = await Car.create({
                uuid,
                brand,
                model,
                year,
                rentalRate, 
            });
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