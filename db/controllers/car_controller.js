const Car = require('../models/car')
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator')

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
            res.status(201).json({ car: newCar });
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

exports.validate = (method) => {
    switch (method) {
        case 'insertCar': {
            return [
                body('brand', 'brand is required').exists(),
                body('brand', 'brand is required').exists(),
                body('year', 'year is required').exists().isInt(),
                body('rentalRate', 'rental rate is required').exists().isFloat(),
            ]
        }
    }
}