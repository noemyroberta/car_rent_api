const CustomerRepository = require('../repositories/customer_repository');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const repository = new CustomerRepository();

const inserted = "Customer created successfully!";
const getted = "Customer getted successfully!";
const gettedAll = "Customers getted successfully!";
const notFound = "Given Customer uuid not found";

exports.insert = async (req, res, next) => {
    verifyError(req, res);

    const { firstName, lastName, email } = req.body;
    const uuid = uuidv4();
    if (firstName && lastName && email) {
        try {
            const newCustomer = await repository.insert({
                uuid,
                firstName,
                lastName,
                email,
            });
            const jsonResponse = { message: inserted, customer: newCustomer };
            res.status(201).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}

exports.getAll = async (req, res, next) => {
    verifyError(req, res);

    try {
        const customers = await repository.getAll();
        const jsonResponse = { message: gettedAll, customers: customers };
        res.status(200).json(jsonResponse);
    } catch (error) {
        return next(error);
    }
}

exports.getByUuid = async (req, res, next) => {
    verifyError(req, res);

    const uuid = req.params.uuid;
    if (uuid) {
        try {
            const foundCustomer = await repository.getByUuid(uuid);

            if (!foundCustomer) {
                res.status(404).json({ error: notFound });
                return;
            }
            const jsonResponse = { message: getted, customer: foundCustomer };
            res.status(200).json(jsonResponse);
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
