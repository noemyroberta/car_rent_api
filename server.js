const http = require('http');
const app = require('./app');
const db = require('./db/db_configuration');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error); 
}

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
