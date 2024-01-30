const Customer = require('../models/customer');

class CustomerRepository {
    async insert(customer) {
        return await Customer.create(customer);
    }

    async updateRentedBefore(uuid) {
        const customer = this.getByUuid(uuid);
        customer.rentedBefore = true;
        await customer.save();
    }

    async getAll() {
        return await Customer.findAll();
    }

    async getByUuid(uuid) {
        return await Customer.findByPk(uuid);
    }
}

module.exports = CustomerRepository;
