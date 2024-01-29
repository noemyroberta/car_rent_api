const { body } = require('express-validator');
exports.validate = (method) => {
    switch (method) {
        case 'insertCar': {
            return [
                body('brand', 'brand is required').exists(),
                body('model', 'model is required').exists(),
                body('year', 'year is required').if(body('year').exists()).isInt(),
                body('rentalRate', 'rental rate is required').if(body('rentalRate').exists()).isFloat(),
            ]
        }
    }
}