const { body, param } = require('express-validator');
exports.validate = (method) => {
    switch (method) {
        case 'rentCar': {
            return [
                body('endDate', 'endDate is required').exists().if(body('endDate').exists()).isISO8601() // Checks if the attribute is a valid ISO 8601 date
                    .custom((value) => isDateOnly(value)),
                body('carUuid', 'carUuid is required').exists().if(body('carUuid').exists()).isString(),
                body('customerUuid', 'customerUuid is required').exists().if(body('customerUuid').exists()).isString(),
            ]
        }
        case 'handOverCar': {
            return [
                param('uuid', 'uuid is required').exists(),
            ]
        }
        case 'getAllByParam': {
            return [

            ]
        }
        case 'getAll': {
            return []
        }
    }
}

const isDateOnly = (value) => {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;
    return iso8601Regex.test(value);
};