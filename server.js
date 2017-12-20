const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 5000;
require('./lib/setup-mongoose');

const server = http.createServer(app);
server.listen(port, () => {
    console.log('server running at', server.address());
});
