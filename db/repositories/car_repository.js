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
        await Car.update(
            { isAvailable: true },
            {
                where: { uuid: uuid }
            });
    }

    async handOver(uuid) {
        await Car.update(
            { isAvailable: false },
            {
                where: { uuid: uuid }
            });
    }
}


module.exports = CarRepository;
