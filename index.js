const server = require('./server');

// port variable enables port to be dynamic
const port = process.env.PORT || 7000;

server.listen(port, () => console.log(`\nAPI running on ${port}\n`));