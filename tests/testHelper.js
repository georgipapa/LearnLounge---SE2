const http = require('http');
const got = require('got');
const app = require('../index');

async function setupServer(t) {
    t.context.server = http.createServer(app);
    await new Promise((resolve) => {
        t.context.server.listen(() => {
            t.context.port = t.context.server.address().port;
            t.context.got = got.extend({ responseType: 'json', prefixUrl: `http://localhost:${t.context.port}` });
            resolve();
        });
    });
}

function teardownServer(t) {
    t.context.server.close();
}

module.exports = {
    setupServer,
    teardownServer,
};