const Rental = require('../models/rental');

class RentalRepository {
    async insert(rental) {
        await Rental.create(rental);
    }

    async getAll() {
        return await Rental.findAll();
    }

    async getById(id) {
        return await Rental.findByPk(id);
    }
}

module.exports = RentalRepository;
