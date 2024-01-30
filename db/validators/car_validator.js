const { body, header } = require('express-validator');
exports.validate = (method) => {
    switch (method) {
        case 'insertCar': {
            return [
                body('brand', 'brand is required').exists(),
                body('model', 'model is required').exists(),
                body('year', 'year is required').exists().if(body('year').exists()).isInt(),
                body('rentalRate', 'rental rate is required').exists().if(body('year').exists()).isFloat(),
            ]
        }
        case 'getCarByUuid': {
            return [
                header('uuid', 'uuid is required').exists().if(header('uuid').exists()).isString(),
            ]
        }
        case 'getAll': {
            return []
        }
    }
}