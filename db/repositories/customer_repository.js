const Customer = require('../models/customer');

class CustomerRepository {
    async insert(customer) {
        await Customer.create(customer);
    }

    async getAll() {
        return await Customer.findAll();
    }

    async getById(id) {
        return await Customer.findByPk(id);
    }
}

module.exports = CustomerRepository;
