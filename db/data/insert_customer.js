const { v4: uuidv4 } = require('uuid');
const db = require("../db_configuration");
const insertionData = [
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
    },
    {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com"
    },
    {
        "firstName": "Michael",
        "lastName": "Johnson",
        "email": "michael.johnson@example.com"
    },
    {
        "firstName": "Emily",
        "lastName": "Williams",
        "email": "emily.williams@example.com"
    },
    {
        "firstName": "Robert",
        "lastName": "Brown",
        "email": "robert.brown@example.com"
    },
    {
        "firstName": "Sophia",
        "lastName": "Jones",
        "email": "sophia.jones@example.com"
    },
    {
        "firstName": "William",
        "lastName": "Miller",
        "email": "william.miller@example.com"
    },
    {
        "firstName": "Olivia",
        "lastName": "Davis",
        "email": "olivia.davis@example.com"
    },
    {
        "firstName": "James",
        "lastName": "Anderson",
        "email": "james.anderson@example.com"
    },
    {
        "firstName": "Emma",
        "lastName": "Wilson",
        "email": "emma.wilson@example.com"
    },
    {
        "firstName": "Alexander",
        "lastName": "Martin",
        "email": "alexander.martin@example.com"
    },
    {
        "firstName": "Isabella",
        "lastName": "Thompson",
        "email": "isabella.thompson@example.com"
    },
    {
        "firstName": "Daniel",
        "lastName": "White",
        "email": "daniel.white@example.com"
    },
    {
        "firstName": "Ava",
        "lastName": "Garcia",
        "email": "ava.garcia@example.com"
    },
    {
        "firstName": "Liam",
        "lastName": "Martinez",
        "email": "liam.martinez@example.com"
    },
    {
        "firstName": "Mia",
        "lastName": "Robinson",
        "email": "mia.robinson@example.com"
    },
    {
        "firstName": "Ethan",
        "lastName": "Hall",
        "email": "ethan.hall@example.com"
    },
    {
        "firstName": "Grace",
        "lastName": "Young",
        "email": "grace.young@example.com"
    },
    {
        "firstName": "Logan",
        "lastName": "Clark",
        "email": "logan.clark@example.com"
    }
];

async function insertData() {
    for (const data of insertionData) {
        const uuid = uuidv4();
        const sql = 'INSERT INTO tb_customer(uuid, firstName, lastName, email) VALUES(?, ?, ?, ?)';
        const values = [uuid, data.firstName, data.lastName, data.email];
        try {
            await db.query(sql, { replacements: values, type: db.QueryTypes.INSERT });
            console.log(`Record inserted with UUID: ${uuid}`);
        } catch (error) {
            console.error(`Error inserting record with UUID ${uuid}:`, error);
        }
    }
    db.close();
}

insertData();