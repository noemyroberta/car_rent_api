const express = require('express');
const customerUrl = require('./utils/customer_url');
const router = express.Router();
const CustomerValidator = require('../db/validators/customer_validator');
const CustomerController = require('../db/controllers/customer_controller');

router.get(
    customerUrl.GET_ALL,
    CustomerValidator.validate('getAll'),
    CustomerController.getAll,
);

router.post(
    customerUrl.INSERT,
    CustomerValidator.validate('insertCustomer'),
    CustomerController.insert,
);

router.get(
    customerUrl.GET_BY_UUID,
    CustomerValidator.validate('getCustomerByUuid'),
    CustomerController.getByUuid,
);

module.exports = router;