const { body } = require('express-validator');
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