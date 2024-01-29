const Rental = require('../models/rental');

class RentalRepository {
    async insert(rental) {
        await Rental.create(rental);
    }

    async getAll() {
        return await Rental.findAll();
    }

    async getByUuid(uuid) {
        return await Rental.findByPk(uuid);
    }
}

module.exports = RentalRepository;
