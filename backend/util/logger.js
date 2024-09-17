const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'purple-connect-backend',
});

module.exports = { log };
