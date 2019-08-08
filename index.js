const server = require('./server');

// port variable enables port to be dynamic
const port = 7000;

server.listen(port, () => console.log(`\nAPI running on http://localhost:${port}\n`));