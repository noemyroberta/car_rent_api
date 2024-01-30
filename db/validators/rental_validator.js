const { body, param } = require('express-validator');
exports.validate = (method) => {
    switch (method) {

        case 'rentCar': {
            return [
                body('endDate', 'endDate is required').exists().if(body('endDate').exists()).isDate(),
                body('carUuid', 'carUuid is required').exists().if(body('carUuid').exists()).isString(),
                body('customerUuid', 'customerUuid is required').exists().if(body('customerUuid').exists()).isString(),
            ]
        }
        case 'handOverCar': {
            return [
                param('uuid', 'uuid is required').exists(),
            ]
        }
        case 'getAllByCustomerUuid': {
            return [
                param('customerUuid', 'customerUuid is required').exists(),
            ]
        }
        case 'getRentalByUuid': {
            return [
                param('uuid', 'uuid is required').exists(),
            ]
        }
        case 'getAll': {
            return []
        }
    }
}