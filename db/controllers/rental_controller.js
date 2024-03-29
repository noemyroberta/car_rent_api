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
const gettedAllByCustomer = "Rentals by customer getted successfully!";
const handedOver = "Car handed over successfully!";
const notFound = "Given rental uuid not found";

exports.rent = async (req, res, next) => {
    verifyError(req, res);

    const { endDate, carUuid, customerUuid } = req.body;
    const uuid = uuidv4();

    if (endDate && carUuid && customerUuid) {
        try {
            const customer = await customerRepo.getByUuid(customerUuid);
            const car = await carRepo.getByUuid(carUuid);

            if (!customer) {
                res.status(400).json({ error: "Customer with the given uuid does not exist" });
                return;
            }

            if (!car) {
                res.status(400).json({ error: "Car with the given uuid does not exist" });
                return;
            } else if (!car.isAvailable) {
                res.status(401).json({ error: "Car with the given uuid is already rented" });
                return;
            }

            await carRepo.rent(carUuid);
            await customerRepo.updateRentedBefore(customerUuid);

            const endDateParsed = _parseDate(endDate);
            const today = _getCurrentDateOnly();
            const rentAmount = _calculateRentAmount(today, endDateParsed, car.rentalRate);

            const newRental = await rentalRepo.insert({
                uuid: uuid,
                startDate: today,
                endDate: endDateParsed,
                rentAmount: rentAmount,
                carUuid: carUuid,
                customerUuid: customerUuid,
            });

            const jsonResponse = { message: inserted, rent: newRental };
            res.status(201).json(jsonResponse);
        } catch (error) {
            return next(error);
        }
    }
}

function _parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function _getCurrentDateOnly() {
    const currentDate = new Date();
    const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
    );
    return currentDateOnly;
}

function _calculateRentAmount(startDate, endDate, rentalRate) {
    const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    return (rentalRate * days);
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

exports.getAllByParam = async (req, res, next) => {
    const filterType = req.params.filter;
    const filterValue = req.query.value;

    console.log(filterType);
    let query;
    switch (filterType) {
        case 'customerUuid':
            query = { customerUuid: filterValue };
            getAllByCustomerUuid(req, res, query);
            break;
        case 'uuid':
            query = { uuid: filterValue };
            getByUuid(req, res, query);
            break;

        default:
            return res.status(400).json({ error: 'Invalid filter type' });
    }
}

async function getByUuid(req, res, query) {
    verifyError(req, res);

    const uuid = query['uuid'];
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

async function getAllByCustomerUuid(req, res, query) {
    verifyError(req, res);

    const customerUuid = query['customerUuid'];
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

            const result = await rentalRepo.getAllByCustomerUuid(customerUuid);
            const jsonResponse = { message: gettedAllByCustomer, rents: result.rows, count: result.count };
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
