const http = require('http');
const app = require('./app');
const db = require('./db/db_configuration');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

db.sync(() => console.log(`Database connected: ${process.env.DB_NAME}`));

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
