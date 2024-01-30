const { body, param } = require('express-validator');
exports.validate = (method) => {
    switch (method) {

        case 'insertCustomer': {
            return [
                body('firstName', 'firstName is required').exists(),
                body('lastName', 'lastName is required').exists(),
                body('email', 'email is required').exists().if(body('email').exists()).isEmail(),
            ]
        }
        case 'getCustomerByUuid': {
            return [
                param('uuid', 'uuid is required').exists().if(param('uuid').exists()).isString(),
            ]
        }
        case 'getAll': {
            return []
        }
    }
}