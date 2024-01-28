const Car = require('../models/car');

class CarRepository {
    async insert(car) {
        await Car.create(car);
    }

    async getAll() {
        return await Car.findAll();
    }

    async getById(id) {
        return await Car.findByPk(id);
    }

    async rent(id) {
        const car = this.getById(id);
        car.available = false;
        await car.save();
    }

    async handOver(id) {
        const car = this.getById(id);
        car.available = true;
        await car.save();
    }
}

module.exports = CarRepository;
