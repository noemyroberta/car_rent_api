const CustomerRepository = require('../repositories/customer_repository');
const CarRepository = require('../repositories/car_repository');
const RentalRepository = require('../repositories/rental_repository');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const customerRepo = new CustomerRepository();
const carRepo = new CarRepository();
const rentalRepo = new RentalRepository();

const inserted = "Car rented successfully!";
const getted = "Rental getted successfully!";
const gettedAll = "Rentals getted successfully!";
const handedOver = "Car handed over successfully!";
const notFound = "Given rental uuid not found";

exports.rent = async (req, res, next) => {
    verifyError(req, res);

    const { endDate, rentAmount, carUuid, customerUuid } = req.body;
    const uuid = uuidv4();

    if (endDate && rentAmount && carUuid && customerUuid) {
        try {
            const customer = await customerRepo.getByUuid(customerUuid);
            const car = await carRepo.getByUuid(carUuid);

            if (!customer) {
                res.status(400).json({ error: "Customer with the given uuid does not exist" });
            }

            if (!car) {
                res.status(400).json({ error: "Car with the given uuid does not exist" });
            } else if (!car.isAvailable) {
                res.status(401).json({ error: "Car with the given uuid is already rented" });
            }

            await carRepo.rent(carUuid);
            await customerRepo.updateRentedBefore(customerUuid);

            const totalRent = _calculateRentAmount(endDate, rentAmount);
            const newRental = await rentalRepo.insert({
                uuid,
                endDate,
                totalRent,
                carUuid,
                customerUuid,
            });

            const jsonResponse = { message: inserted, rent: newRental };
            res.status(201).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}

async function _calculateRentAmount(endDate, rentAmount) {
    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const days = endDate - currentDateOnly;
    return rentAmount * days;
}

exports.getAll = async (req, res, next) => {
    verifyError(req, res);

    try {
        const rents = await rentalRepo.getAll();
        const jsonResponse = { message: gettedAll, rents: rents };
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
            const foundRent = await rentalRepo.getByUuid(uuid);

            if (!foundRent) {
                res.status(404).json({ error: notFound });
                return;
            }
            const jsonResponse = { message: getted, rent: foundRent };
            res.status(200).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}

exports.getAllByCustomerUuid = async (req, res, next) => {
    verifyError(req, res);

    const customerUuid = req.params.uuid;
    if (customerUuid) {
        try {
            const foundCustomer = await customerRepo.getByUuid(customerUuid);

            if (!foundCustomer) {
                res.status(400).json({ error: 'Customer with the given uuid does not exist' });
                return;
            } else if (!foundCustomer.rentedBefore) {
                res.status(401).json({ error: 'Customer with the given uuid does not have rents yet' });
                return;
            }

            const { count, foundRents } = await rentalRepo.getAllByCustomerUuid(customerUuid);
            const jsonResponse = { message: gettedAll, rents: foundRents, count: count };
            res.status(200).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}


exports.handOver = async (req, res, next) => {
    verifyError(req, res);

    const uuid = req.params.uuid;
    if (uuid) {
        try {
            const foundRent = await rentalRepo.getByUuid(uuid);

            if (!foundRent) {
                res.status(404).json({ error: notFound });
                return;
            }

            await rentalRepo.handOver(uuid);
            await carRepo.handOver(foundRent.carUuid);

            const jsonResponse = { message: handedOver };
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
