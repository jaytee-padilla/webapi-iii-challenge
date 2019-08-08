const express = require('express');
const server = express();
server.use(express.json());

// routes
const usersRoute = require('./users/userRouter');
server.use('/users', usersRoute);

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API
server.use(logger);

server.get('/', (req, res) => {
	res.send(`<h2>API running</h2>`);
});

//custom middleware
function logger(req, res, next) {
	console.log(
		`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
	);
	next();
};

module.exports = server;
