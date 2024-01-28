const Car = require('../models/car');

class CarRepository {
    static insert(car) {
        console.log(`Inserting new car ${car}`);
        Car.create(car);
    }
    static getAll() {
        console.log(Car.findAll());
    }

    static getById(id) {
        return Car.findByPk(id);
    }
}

module.exports = CarRepository;
