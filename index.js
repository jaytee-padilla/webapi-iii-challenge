const express = require('express');
const server = express();

// setup api server
server.use(express.json());
server.get('/', (req, res) => res.send('\nAPI running\n'));
server.listen(7000, () => console.log('\nAPI running on port 7000\n'));

// routing
const routes = require('./server');
server.use('/api', routes);