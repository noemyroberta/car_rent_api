const { v4: uuidv4 } = require('uuid');
const db = require('../db_configuration');

const insertionData = [
    {
        "brand": "Honda",
        "model": "Accord",
        "year": 2021,
        "rentalRate": 55.00
    },
    {
        "brand": "Ford",
        "model": "Fusion",
        "year": 2019,
        "rentalRate": 48.50
    },
    {
        "brand": "Chevrolet",
        "model": "Malibu",
        "year": 2022,
        "rentalRate": 52.75
    },
    {
        "brand": "Nissan",
        "model": "Altima",
        "year": 2018,
        "rentalRate": 45.80
    },
    {
        "brand": "Hyundai",
        "model": "Sonata",
        "year": 2020,
        "rentalRate": 49.25
    },
    {
        "brand": "Volkswagen",
        "model": "Passat",
        "year": 2017,
        "rentalRate": 44.90
    },
    {
        "brand": "BMW",
        "model": "3 Series",
        "year": 2022,
        "rentalRate": 60.50
    },
    {
        "brand": "Mercedes-Benz",
        "model": "C-Class",
        "year": 2019,
        "rentalRate": 58.75
    },
    {
        "brand": "Audi",
        "model": "A4",
        "year": 2020,
        "rentalRate": 56.20
    },
    {
        "brand": "Lexus",
        "model": "ES",
        "year": 2021,
        "rentalRate": 59.90
    },
    {
        "brand": "Mazda",
        "model": "6",
        "year": 2018,
        "rentalRate": 46.30
    },
    {
        "brand": "Subaru",
        "model": "Legacy",
        "year": 2021,
        "rentalRate": 53.40
    },
    {
        "brand": "Kia",
        "model": "Optima",
        "year": 2019,
        "rentalRate": 47.80
    },
    {
        "brand": "TeslaModel",
        "model": "S",
        "year": 2022,
        "rentalRate": 90.00
    },
    {
        "brand": "Jaguar",
        "model": "XE",
        "year": 2020,
        "rentalRate": 65.25
    },
    {
        "brand": "Volvo",
        "model": "S60",
        "year": 2017,
        "rentalRate": 49.90
    },
    {
        "brand": "Chrysler",
        "model": "300",
        "year": 2021,
        "rentalRate": 54.75
    },
    {
        "brand": "Buick",
        "model": "Regal",
        "year": 2018,
        "rentalRate": 48.60
    },
    {
        "brand": "Infiniti",
        "model": "Q50",
        "year": 2022,
        "rentalRate": 62.00
    }
];

for (const data of insertionData) {
    const uuid = uuidv4();
    const sql = 'INSERT INTO tb_car (uuid, brand, model, year, rentalRate) VALUES (?, ?, ?, ?, ?)';
    const values = [uuid, data.brand, data.model, data.year, data.rentalRate];
    db.query(sql, values);
}