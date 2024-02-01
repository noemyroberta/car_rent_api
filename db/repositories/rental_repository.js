const Rental = require('../models/rental');

class RentalRepository {
    async insert(rental) {
        console.log(`RENTTTTTT => ${rental}`);
        return await Rental.create(rental);
    }

    async getAll() {
        return await Rental.findAll();
    }

    async getByUuid(uuid) {
        return await Rental.findByPk(uuid);
    }

    async getAllByCustomerUuid(customerUuid) {
        const { count, rows } = await Rental.findAndCountAll({
            where: {
                customerUuid: {
                    [Op.like]: `${customerUuid}`
                }
            },
        });

        return { count, rows };
    }
}

module.exports = RentalRepository;
