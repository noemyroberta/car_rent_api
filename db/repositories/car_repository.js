const Car = require('../models/car');

class CarRepository {
    insert(car) {
        Car.create(car);
    }

    getAll() {
        return Car.findAll();
    }

    getById(id) {
        return Car.findByPk(id);
    }

    rent(id) {
        const car = this.getById(id);
        car.available = false;
        car.save();
    }
}

module.exports = CarRepository;
