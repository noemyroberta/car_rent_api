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
        return _updateIsAvailable(true, uuid);
    }

    async _updateIsAvailable(availability, uuid) {
        const [_, [updatedCar]] = await Car.update(
            { available: availability },
            { where: uuid, returning: true }
        );
        return updatedCar;
    }

    async handOver(uuid) {
        return _updateIsAvailable(false, uuid);
    }
}

module.exports = CarRepository;
