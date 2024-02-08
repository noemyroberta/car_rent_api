
# Car Rent API - Guide & Docs

This project works around the base functions needed in car renting. The main agents are: **Customer**, **Car** & **Rental**.

For best experience in testing routes, please consider installing `Postman` or `Insomnia` so you can place the urls mentioned in this document.

## Install & Run

#### 1. Clone the repo

To get started, you need to clone this repository on your machine:

```https://github.com/noemyroberta/car_rent_api.git```

#### 2. Install Node JS

This project is made with Node JS. Please, install it [here](https://nodejs.org/dist/v21.6.1/node-v21.6.1-linux-x64.tar.xz).

#### 3. Install dependencies

You need to install the dependencies required to run the project.

```npm install```

You'll install all of the following deps:

```json
"body-parser": "^1.20.2",
"dotenv": "^16.4.1",
"express": "^4.18.2",
"express-validator": "^7.0.1",
"sqlite3": "^5.1.7",
"sequelize": "^6.35.2",
"uuid": "^9.0.1"
```

#### 4. Run the SQL inserts

To have some data registered on database, you need to run this commands.

`node db/data/insert_car.js`

Then, you run:

`node db/data/insert_customer.js`

You're ready to get started!

`npm start`

**WARNING:** Make sure you're on the project root.

## Documentation

### Rental Endpoints

`GET_ALL` - should return a list of all rents.

```http
  GET localhost:3000/rental/
```

`GET_BY_UUID` - should return a specific rent.

```http
  GET localhost:3000/rental/uuid?value=${uuid}
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `uuid`      | `string` | **Required**. The rent uuid. |

`GET_BY_CUSTOMER_UUID`- should return a list of all rents made by a customer.

```http
  GET localhost:3000/rental/customerUuid?value=${customerUuid}
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `customerUuid`      | `string` | **Required**. The customer uuid. |

`RENT`- should return a new rent registered.

```http
  POST localhost:3000/rental/
```

#### Body Input

```json
{
  "endDate": "2024-02-06",
  "carUuid": "4a1060e7-5b0f-46ae-aa18-589f9c60bc62",
  "customerUuid": "11dafa10-ef51-4e8a-8e32-c38d3e0379e0"
}
```

`HAND_OVER`- should return a car handed over.

```http
  PUT localhost:3000/rental/${rentUuid}
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `rentUuid`      | `string` | **Required**. The rent uuid. |
