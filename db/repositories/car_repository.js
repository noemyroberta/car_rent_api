const Car = require('../models/car');

class CarRepository {
    async insert(car) {
        return await Car.create(car);
    }

    async getAll() {
        return await Car.findAll();
    }

    async getByUuid(uuid) {
        return await Car.findByPk(uuid);
    }

    async rent(uuid) {
        const car = this.getByUuid(uuid);
        car.available = false;
        await car.save();
    }

    async handOver(uuid) {
        const car = this.getByUuid(uuid);
        car.available = true;
        await car.save();
    }
}

module.exports = CarRepository;
